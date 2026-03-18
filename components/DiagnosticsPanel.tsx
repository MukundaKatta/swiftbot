'use client';

import { useStore } from '@/lib/store';
import { CheckCircle, AlertTriangle, XCircle, Wrench } from 'lucide-react';

const icons: Record<string, any> = { ok: CheckCircle, warning: AlertTriangle, error: XCircle };
const colors: Record<string, string> = { ok: 'text-green-400 bg-green-500/10', warning: 'text-yellow-400 bg-yellow-500/10', error: 'text-red-400 bg-red-500/10' };

export default function DiagnosticsPanel() {
  const { diagnostics, fleet } = useStore();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Diagnostics</h2>
      <div className="space-y-3">
        {diagnostics.map((d) => {
          const Icon = icons[d.status];
          const robot = fleet.find((f) => f.id === d.robotId);
          return (
            <div key={d.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colors[d.status]}`}><Icon size={18} /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{d.component}</p>
                  <p className="text-xs text-gray-400">{d.message}</p>
                  <p className="text-xs text-gray-500 mt-1">Robot: {robot?.name} | {new Date(d.timestamp).toLocaleString()}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded capitalize ${colors[d.status]}`}>{d.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
