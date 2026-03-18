'use client';

import { useStore } from '@/lib/store';
import { Trophy, Medal, TrendingUp } from 'lucide-react';

export default function Leaderboard() {
  const { fleet } = useStore();
  const sorted = [...fleet].sort((a, b) => b.tasksCompleted - a.tasksCompleted);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Performance Leaderboard</h2>
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
        <div className="space-y-3">
          {sorted.map((unit, i) => (
            <div key={unit.id} className={`flex items-center gap-4 p-4 rounded-lg ${i < 3 ? 'bg-gray-800/50' : 'bg-gray-800/20'}`}>
              <div className="w-8 text-center">
                {i === 0 ? <Trophy size={20} className="text-yellow-400 mx-auto" /> :
                 i === 1 ? <Medal size={20} className="text-gray-300 mx-auto" /> :
                 i === 2 ? <Medal size={20} className="text-amber-600 mx-auto" /> :
                 <span className="text-gray-500 font-bold">#{i + 1}</span>}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{unit.name}</p>
                <p className="text-xs text-gray-500">{unit.model} | {unit.location.label}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-swift-400">{unit.tasksCompleted.toLocaleString()}</p>
                <p className="text-xs text-gray-500">tasks completed</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-400">{unit.uptimeHours}h</p>
                <p className="text-xs text-gray-500">uptime</p>
              </div>
              <div className="w-32">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-swift-500 rounded-full" style={{ width: `${(unit.tasksCompleted / sorted[0].tasksCompleted) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
