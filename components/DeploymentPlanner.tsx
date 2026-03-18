'use client';

import { useStore } from '@/lib/store';
import { Rocket, MapPin, Bot, Calendar, CheckCircle, Circle } from 'lucide-react';

const statusColors: Record<string, string> = { planned: 'text-yellow-400', deploying: 'text-swift-400', active: 'text-green-400' };

export default function DeploymentPlanner() {
  const { deployments } = useStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Deployment Planner</h2>
        <button className="px-4 py-2 bg-swift-500 rounded-lg text-sm">New Deployment</button>
      </div>
      <div className="space-y-4">
        {deployments.map((dp) => (
          <div key={dp.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{dp.name}</h3>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12} />{dp.location}</span>
                  <span className="flex items-center gap-1"><Bot size={12} />{dp.robots} robots</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{dp.startDate}</span>
                </div>
              </div>
              <span className={`text-sm font-semibold capitalize ${statusColors[dp.status]}`}>{dp.status}</span>
            </div>
            <div className="space-y-2">
              {dp.tasks.map((task, i) => {
                const done = dp.status === 'active' || (dp.status === 'deploying' && i < 2);
                return (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    {done ? <CheckCircle size={16} className="text-green-400" /> : <Circle size={16} className="text-gray-600" />}
                    <span className={done ? 'text-gray-300' : 'text-gray-500'}>{task}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
