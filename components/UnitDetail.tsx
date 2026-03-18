'use client';

import { useStore } from '@/lib/store';
import { Bot, Battery, MapPin, Clock, Cpu, CheckCircle } from 'lucide-react';

export default function UnitDetail() {
  const { selectedRobot, fleet } = useStore();
  const robot = selectedRobot || fleet[0];
  if (!robot) return <p className="text-gray-500">No robot selected</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">{robot.name} - Detail View</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-swift-500/20 rounded-2xl flex items-center justify-center">
                <Bot size={32} className="text-swift-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{robot.name}</h3>
                <p className="text-sm text-gray-400">{robot.model} | Firmware {robot.firmware}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Battery', value: `${robot.battery}%`, icon: Battery, color: robot.battery > 50 ? 'text-green-400' : 'text-yellow-400' },
                { label: 'Location', value: robot.location.label, icon: MapPin, color: 'text-swift-400' },
                { label: 'Uptime', value: `${robot.uptimeHours}h`, icon: Clock, color: 'text-blue-400' },
                { label: 'Tasks Done', value: robot.tasksCompleted.toString(), icon: CheckCircle, color: 'text-purple-400' },
              ].map((m) => (
                <div key={m.label} className="bg-gray-800/30 rounded-lg p-3">
                  <m.icon size={16} className={`${m.color} mb-1`} />
                  <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3">Performance History (Last 24h)</h3>
            <div className="h-32 flex items-end gap-px">
              {Array.from({ length: 24 }).map((_, i) => {
                const v = 60 + Math.random() * 35;
                return <div key={i} className="flex-1 bg-swift-500/40 rounded-t" style={{ height: `${v}%` }} />;
              })}
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1"><span>24h ago</span><span>Now</span></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3">Status</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Status', value: robot.status },
                { label: 'Model', value: robot.model },
                { label: 'Firmware', value: robot.firmware },
                { label: 'Last Seen', value: new Date(robot.lastSeen).toLocaleString() },
              ].map((i) => (
                <div key={i.label} className="flex justify-between">
                  <span className="text-gray-500">{i.label}</span>
                  <span className="capitalize">{i.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {['Send to Charging', 'Run Diagnostics', 'Update Firmware', 'Reboot', 'Emergency Stop'].map((a) => (
                <button key={a} className="w-full px-3 py-2 bg-gray-800/50 rounded-lg text-xs text-left text-gray-400 hover:text-white hover:bg-gray-800">{a}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
