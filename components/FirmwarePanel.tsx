'use client';

import { useStore } from '@/lib/store';
import { Download, CheckCircle, Clock } from 'lucide-react';

export default function FirmwarePanel() {
  const { firmware, fleet } = useStore();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Firmware OTA Updates</h2>
      <div className="space-y-4">
        {firmware.map((fw) => (
          <div key={fw.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">Version {fw.version}</h3>
                <p className="text-xs text-gray-500">Released {fw.releaseDate} | {fw.size}</p>
              </div>
              <span className={`flex items-center gap-1 text-xs px-3 py-1 rounded ${
                fw.status === 'installed' ? 'bg-green-500/10 text-green-400' : 'bg-swift-500/10 text-swift-400'
              }`}>
                {fw.status === 'installed' ? <CheckCircle size={12} /> : <Download size={12} />}
                {fw.status}
              </span>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Changes</h4>
              <ul className="space-y-1">{fw.changes.map((c, i) => (<li key={i} className="text-sm text-gray-400 flex items-center gap-2"><span className="w-1 h-1 bg-swift-400 rounded-full" />{c}</li>))}</ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-2">Target Robots ({fw.targetRobots.length})</h4>
              <div className="flex gap-2 flex-wrap">
                {fw.targetRobots.map((rid) => {
                  const r = fleet.find((f) => f.id === rid);
                  return <span key={rid} className="px-2 py-1 bg-gray-800/50 rounded text-xs">{r?.name || rid}</span>;
                })}
              </div>
            </div>
            {fw.status === 'available' && (
              <button className="mt-4 w-full px-4 py-2 bg-swift-500 hover:bg-swift-600 rounded-lg text-sm">Deploy Update</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
