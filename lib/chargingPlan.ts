/**
 * Robot-fleet charging plan.
 *
 * Each robot reports current battery %, discharge rate, and duty
 * timetable; the depot has a limited number of charging docks. This
 * module interleaves charge windows so coverage is maintained — i.e.
 * we never let two robots on the same route go critical at once.
 */

export type Robot = {
  id: string;
  routeId: string;
  batteryPct: number;        // 0..100
  dischargeRatePctPerHour: number;
  chargeRatePctPerHour: number;
  minSafePct?: number;       // default 20
  targetPct?: number;        // default 85
};

export type Dock = {
  id: string;
  availableFromHour: number; // hours from now
};

export type ChargeWindow = {
  robotId: string;
  dockId: string;
  startHour: number;
  endHour: number;
  startPct: number;
  endPct: number;
};

export type PlanConfig = {
  horizonHours: number;
  minSafePct: number;
  targetPct: number;
};

export const DEFAULT_PLAN_CONFIG: PlanConfig = {
  horizonHours: 12,
  minSafePct: 20,
  targetPct: 85,
};

/** Hours until a robot would fall below its safe floor. */
export function hoursToCritical(robot: Robot, floor: number): number {
  if (robot.dischargeRatePctPerHour <= 0) return Number.POSITIVE_INFINITY;
  return Math.max(0, (robot.batteryPct - floor) / robot.dischargeRatePctPerHour);
}

/** Order robots by urgency; ties broken by route to spread per-route risk. */
export function urgencyOrder(robots: Robot[], cfg: PlanConfig): Robot[] {
  return [...robots].sort((a, b) => {
    const ha = hoursToCritical(a, a.minSafePct ?? cfg.minSafePct);
    const hb = hoursToCritical(b, b.minSafePct ?? cfg.minSafePct);
    if (ha !== hb) return ha - hb;
    return a.routeId.localeCompare(b.routeId);
  });
}

/**
 * Greedy plan. Iterates robots by urgency and assigns the earliest
 * available dock, advancing each dock's `availableFromHour` by the
 * fill time. We avoid overlapping two robots on the same route by
 * tracking the last charging end-time per route.
 */
export function planCharging(
  robots: Robot[],
  docks: Dock[],
  cfg: PlanConfig = DEFAULT_PLAN_CONFIG,
): { windows: ChargeWindow[]; unserved: string[] } {
  const dockState = docks.map((d) => ({ ...d }));
  const routeBusyUntil = new Map<string, number>();
  const windows: ChargeWindow[] = [];
  const unserved: string[] = [];
  const queue = urgencyOrder(robots, cfg);

  for (const robot of queue) {
    const floor = robot.minSafePct ?? cfg.minSafePct;
    const target = robot.targetPct ?? cfg.targetPct;
    const startPct = robot.batteryPct;
    const needed = Math.max(0, target - startPct);
    if (needed === 0) continue;
    const fillHours = needed / robot.chargeRatePctPerHour;

    // earliest time the route tolerates starting a charge
    const routeReady = routeBusyUntil.get(robot.routeId) ?? 0;
    let best: typeof dockState[number] | null = null;
    let bestStart = Number.POSITIVE_INFINITY;
    for (const d of dockState) {
      const start = Math.max(d.availableFromHour, routeReady);
      if (start < bestStart) { best = d; bestStart = start; }
    }
    if (!best || bestStart + fillHours > cfg.horizonHours) {
      unserved.push(robot.id);
      continue;
    }
    const end = bestStart + fillHours;
    windows.push({
      robotId: robot.id,
      dockId: best.id,
      startHour: round2(bestStart),
      endHour: round2(end),
      startPct: round2(startPct),
      endPct: round2(target),
    });
    best.availableFromHour = end;
    routeBusyUntil.set(robot.routeId, end);
  }
  return { windows, unserved };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Summary stats for the dashboard card. */
export function planSummary(windows: ChargeWindow[]): {
  totalRobots: number;
  totalChargeHours: number;
  peakConcurrent: number;
} {
  const totalChargeHours = windows.reduce((a, w) => a + (w.endHour - w.startHour), 0);
  // sweep events to find peak concurrent docks in use
  const events: { t: number; delta: number }[] = [];
  for (const w of windows) {
    events.push({ t: w.startHour, delta: 1 });
    events.push({ t: w.endHour, delta: -1 });
  }
  events.sort((a, b) => a.t - b.t || a.delta - b.delta);
  let cur = 0;
  let peak = 0;
  for (const e of events) {
    cur += e.delta;
    if (cur > peak) peak = cur;
  }
  return {
    totalRobots: new Set(windows.map((w) => w.robotId)).size,
    totalChargeHours: round2(totalChargeHours),
    peakConcurrent: peak,
  };
}
