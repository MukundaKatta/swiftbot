import { create } from 'zustand';

export interface FleetUnit {
  id: string; name: string; model: string; status: 'active' | 'idle' | 'charging' | 'maintenance' | 'offline';
  battery: number; location: { lat: number; lng: number; label: string };
  firmware: string; lastSeen: string; tasksCompleted: number; uptimeHours: number;
}

export interface Diagnostic {
  id: string; robotId: string; component: string; status: 'ok' | 'warning' | 'error';
  message: string; timestamp: string;
}

export interface FirmwareUpdate {
  id: string; version: string; releaseDate: string; size: string;
  changes: string[]; status: 'available' | 'downloading' | 'installed';
  targetRobots: string[];
}

export interface PricingTier {
  id: string; name: string; monthlyPrice: number; robots: number;
  features: string[]; popular: boolean;
}

export interface DeploymentPlan {
  id: string; name: string; location: string; robots: number;
  startDate: string; status: 'planned' | 'deploying' | 'active';
  tasks: string[];
}

interface SwiftBotState {
  activeTab: string;
  fleet: FleetUnit[];
  diagnostics: Diagnostic[];
  firmware: FirmwareUpdate[];
  pricing: PricingTier[];
  deployments: DeploymentPlan[];
  selectedRobot: FleetUnit | null;
  setActiveTab: (tab: string) => void;
  setFleet: (f: FleetUnit[]) => void;
  setDiagnostics: (d: Diagnostic[]) => void;
  setFirmware: (f: FirmwareUpdate[]) => void;
  setPricing: (p: PricingTier[]) => void;
  setDeployments: (d: DeploymentPlan[]) => void;
  setSelectedRobot: (r: FleetUnit | null) => void;
}

export const useStore = create<SwiftBotState>((set) => ({
  activeTab: 'map', fleet: [], diagnostics: [], firmware: [], pricing: [], deployments: [],
  selectedRobot: null,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setFleet: (fleet) => set({ fleet }),
  setDiagnostics: (diagnostics) => set({ diagnostics }),
  setFirmware: (firmware) => set({ firmware }),
  setPricing: (pricing) => set({ pricing }),
  setDeployments: (deployments) => set({ deployments }),
  setSelectedRobot: (r) => set({ selectedRobot: r }),
}));
