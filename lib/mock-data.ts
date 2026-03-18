import { FleetUnit, Diagnostic, FirmwareUpdate, PricingTier, DeploymentPlan } from './store';

export const mockFleet: FleetUnit[] = [
  { id: 'su1', name: 'Swift-Alpha', model: 'SB-200', status: 'active', battery: 85, location: { lat: 37.78, lng: -122.41, label: 'Warehouse A' }, firmware: '3.2.1', lastSeen: new Date().toISOString(), tasksCompleted: 1243, uptimeHours: 2100 },
  { id: 'su2', name: 'Swift-Beta', model: 'SB-200', status: 'active', battery: 62, location: { lat: 37.79, lng: -122.40, label: 'Warehouse A' }, firmware: '3.2.1', lastSeen: new Date().toISOString(), tasksCompleted: 987, uptimeHours: 1800 },
  { id: 'su3', name: 'Swift-Gamma', model: 'SB-300', status: 'charging', battery: 28, location: { lat: 37.77, lng: -122.42, label: 'Charging Station 1' }, firmware: '3.1.0', lastSeen: new Date(Date.now()-300000).toISOString(), tasksCompleted: 2100, uptimeHours: 3400 },
  { id: 'su4', name: 'Swift-Delta', model: 'SB-200', status: 'maintenance', battery: 45, location: { lat: 37.78, lng: -122.43, label: 'Service Bay' }, firmware: '3.1.0', lastSeen: new Date(Date.now()-3600000).toISOString(), tasksCompleted: 560, uptimeHours: 900 },
  { id: 'su5', name: 'Swift-Echo', model: 'SB-300', status: 'active', battery: 91, location: { lat: 37.80, lng: -122.39, label: 'Warehouse B' }, firmware: '3.2.1', lastSeen: new Date().toISOString(), tasksCompleted: 1567, uptimeHours: 2800 },
  { id: 'su6', name: 'Swift-Foxtrot', model: 'SB-100', status: 'idle', battery: 100, location: { lat: 37.76, lng: -122.41, label: 'Staging Area' }, firmware: '3.2.0', lastSeen: new Date(Date.now()-600000).toISOString(), tasksCompleted: 342, uptimeHours: 500 },
  { id: 'su7', name: 'Swift-Golf', model: 'SB-300', status: 'active', battery: 73, location: { lat: 37.81, lng: -122.40, label: 'Warehouse C' }, firmware: '3.2.1', lastSeen: new Date().toISOString(), tasksCompleted: 1890, uptimeHours: 3100 },
  { id: 'su8', name: 'Swift-Hotel', model: 'SB-200', status: 'offline', battery: 0, location: { lat: 37.77, lng: -122.44, label: 'Unknown' }, firmware: '3.0.0', lastSeen: new Date(Date.now()-86400000).toISOString(), tasksCompleted: 150, uptimeHours: 200 },
];

export const mockDiagnostics: Diagnostic[] = [
  { id: 'dg1', robotId: 'su4', component: 'Left Wheel Motor', status: 'error', message: 'Motor encoder signal intermittent', timestamp: '2024-04-01T10:00:00Z' },
  { id: 'dg2', robotId: 'su3', component: 'Battery', status: 'warning', message: 'Charging slower than expected (42W vs 60W nominal)', timestamp: '2024-04-01T11:00:00Z' },
  { id: 'dg3', robotId: 'su8', component: 'Communication', status: 'error', message: 'No heartbeat received for 24 hours', timestamp: '2024-03-31T10:00:00Z' },
  { id: 'dg4', robotId: 'su1', component: 'LIDAR', status: 'ok', message: 'Calibration check passed', timestamp: '2024-04-01T08:00:00Z' },
  { id: 'dg5', robotId: 'su5', component: 'Camera', status: 'ok', message: 'All cameras operational', timestamp: '2024-04-01T09:00:00Z' },
];

export const mockFirmware: FirmwareUpdate[] = [
  { id: 'fw1', version: '3.3.0', releaseDate: '2024-04-05', size: '245 MB', changes: ['Improved obstacle avoidance', 'Battery optimization', 'New task scheduling algorithm'], status: 'available', targetRobots: ['su1', 'su2', 'su5', 'su7'] },
  { id: 'fw2', version: '3.2.1', releaseDate: '2024-03-15', size: '180 MB', changes: ['Bug fix: navigation drift', 'Security patch'], status: 'installed', targetRobots: ['su1', 'su2', 'su5', 'su7'] },
];

export const mockPricing: PricingTier[] = [
  { id: 'pt1', name: 'Starter', monthlyPrice: 999, robots: 5, features: ['Basic fleet monitoring', 'Manual task assignment', 'Email support', 'Monthly reports'], popular: false },
  { id: 'pt2', name: 'Professional', monthlyPrice: 2499, robots: 25, features: ['Real-time monitoring', 'Automated scheduling', 'Priority support', 'Weekly reports', 'OTA updates', 'API access'], popular: true },
  { id: 'pt3', name: 'Enterprise', monthlyPrice: 7999, robots: 100, features: ['Everything in Pro', 'Dedicated support', 'Custom integrations', 'SLA guarantee', 'On-site training', 'Multi-site management'], popular: false },
];

export const mockDeployments: DeploymentPlan[] = [
  { id: 'dp1', name: 'Warehouse A Expansion', location: 'San Francisco', robots: 5, startDate: '2024-04-15', status: 'planned', tasks: ['Site survey', 'Network setup', 'Robot deployment', 'Training'] },
  { id: 'dp2', name: 'Warehouse B Setup', location: 'Oakland', robots: 3, startDate: '2024-03-01', status: 'active', tasks: ['Site survey', 'Network setup', 'Robot deployment', 'Training'] },
];
