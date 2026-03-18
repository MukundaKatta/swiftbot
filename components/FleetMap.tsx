'use client';

import { useStore } from '@/lib/store';
import { MapPin, Battery, Signal } from 'lucide-react';

const statusColors: Record<string, string> = { active: '#22c55e', idle: '#eab308', charging: '#3b82f6', maintenance: '#f97316', offline: '#ef4444' };

export default function FleetMap() {
  const { fleet, setSelectedRobot, setActiveTab } = useStore();

  const stats = {
    total: fleet.length,
    active: fleet.filter((f) => f.status === 'active').length,
    charging: fleet.filter((f) => f.status === 'charging').length,
    offline: fleet.filter((f) => f.status === 'offline').length,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Fleet Map</h2>
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Fleet', value: stats.total, color: 'text-swift-400' },
          { label: 'Active', value: stats.active, color: 'text-green-400' },
          { label: 'Charging', value: stats.charging, color: 'text-blue-400' },
          { label: 'Offline', value: stats.offline, color: 'text-red-400' },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <p className="text-sm text-gray-400">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <h3 className="font-semibold text-sm mb-4">Map View</h3>
        <div className="relative bg-gray-800/30 rounded-lg" style={{ height: 400 }}>
          <svg className="w-full h-full" viewBox="37.75 -122.45 0.08 0.08">
            {fleet.map((unit) => (
              <g key={unit.id} onClick={() => { setSelectedRobot(unit); setActiveTab('unit'); }} className="cursor-pointer">
                <circle cx={unit.location.lat} cy={-unit.location.lng} r={0.003}
                  fill={statusColors[unit.status]} opacity={0.8} />
                <circle cx={unit.location.lat} cy={-unit.location.lng} r={0.005}
                  fill="none" stroke={statusColors[unit.status]} strokeWidth={0.001} opacity={0.4} />
                <text x={unit.location.lat} y={-unit.location.lng + 0.008}
                  textAnchor="middle" fill="#ccc" fontSize={0.003}>{unit.name}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {fleet.map((unit) => (
          <div key={unit.id}
            onClick={() => { setSelectedRobot(unit); setActiveTab('unit'); }}
            className="bg-gray-900/50 border border-gray-800 rounded-xl p-3 cursor-pointer hover:border-swift-500/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{unit.name}</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[unit.status] }} />
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex items-center gap-1"><MapPin size={10} />{unit.location.label}</div>
              <div className="flex items-center gap-1"><Battery size={10} />{unit.battery}%</div>
              <div className="flex items-center gap-1"><Signal size={10} />{unit.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
