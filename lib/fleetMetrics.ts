/**
 * Fleet-level aggregation for robot telemetry.
 *
 * Rolls up per-robot heartbeats and task logs into the single-page
 * overview: uptime, task throughput, failure rate, battery health,
 * and a leaderboard for alerting on outliers.
 */

export type RobotHeartbeat = {
  robotId: string;
  timestamp: string;
  battery: number; // 0..1
  online: boolean;
  tasksDone?: number;
  tasksFailed?: number;
  uptimeSec?: number;
};

export type FleetSnapshot = {
  robotCount: number;
  onlineCount: number;
  onlineRate: number;
  avgBattery: number;
  lowBatteryCount: number;
  totalTasksDone: number;
  totalTasksFailed: number;
  successRate: number;
  totalUptimeSec: number;
  /** Top N robots by tasks completed. */
  topPerformers: { robotId: string; tasksDone: number }[];
  /** Robots whose success rate trails the fleet average by > 15pp. */
  underperformers: string[];
};

const LOW_BATTERY = 0.25;

export function snapshot(
  beats: RobotHeartbeat[],
  { topN = 5, laggardGap = 0.15 }: { topN?: number; laggardGap?: number } = {},
): FleetSnapshot {
  const latest = new Map<string, RobotHeartbeat>();
  for (const b of beats) {
    const prev = latest.get(b.robotId);
    if (!prev || b.timestamp > prev.timestamp) latest.set(b.robotId, b);
  }
  const rows = Array.from(latest.values());
  const online = rows.filter((r) => r.online);
  const totalTasksDone = rows.reduce((s, r) => s + (r.tasksDone || 0), 0);
  const totalTasksFailed = rows.reduce((s, r) => s + (r.tasksFailed || 0), 0);
  const denom = totalTasksDone + totalTasksFailed;
  const successRate = denom ? totalTasksDone / denom : 0;
  const avgBattery = rows.length
    ? rows.reduce((s, r) => s + r.battery, 0) / rows.length
    : 0;

  const perRobotSuccess: { robotId: string; rate: number; done: number }[] = rows.map((r) => {
    const d = r.tasksDone || 0;
    const f = r.tasksFailed || 0;
    return { robotId: r.robotId, rate: d + f ? d / (d + f) : 0, done: d };
  });

  const topPerformers = [...perRobotSuccess]
    .sort((a, b) => b.done - a.done)
    .slice(0, topN)
    .map((r) => ({ robotId: r.robotId, tasksDone: r.done }));

  const underperformers = perRobotSuccess
    .filter((r) => r.rate < successRate - laggardGap)
    .map((r) => r.robotId);

  return {
    robotCount: rows.length,
    onlineCount: online.length,
    onlineRate: rows.length ? online.length / rows.length : 0,
    avgBattery,
    lowBatteryCount: rows.filter((r) => r.battery < LOW_BATTERY).length,
    totalTasksDone,
    totalTasksFailed,
    successRate,
    totalUptimeSec: rows.reduce((s, r) => s + (r.uptimeSec || 0), 0),
    topPerformers,
    underperformers,
  };
}

export function formatUptime(sec: number): string {
  if (sec < 3600) return `${Math.round(sec / 60)}m`;
  if (sec < 86_400) return `${(sec / 3600).toFixed(1)}h`;
  return `${(sec / 86_400).toFixed(1)}d`;
}
