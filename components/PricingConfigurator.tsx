'use client';

import { useStore } from '@/lib/store';
import { Check, Star } from 'lucide-react';

export default function PricingConfigurator() {
  const { pricing } = useStore();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Pricing Configurator</h2>
      <div className="grid grid-cols-3 gap-6">
        {pricing.map((tier) => (
          <div key={tier.id} className={`bg-gray-900/50 border rounded-xl p-6 relative ${tier.popular ? 'border-swift-500' : 'border-gray-800'}`}>
            {tier.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-swift-500 rounded-full text-xs font-bold">Most Popular</div>}
            <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
            <p className="text-3xl font-bold mb-1">${tier.monthlyPrice}<span className="text-sm text-gray-500">/mo</span></p>
            <p className="text-xs text-gray-500 mb-6">Up to {tier.robots} robots</p>
            <div className="space-y-2 mb-6">
              {tier.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm"><Check size={14} className="text-swift-400" />{f}</div>
              ))}
            </div>
            <button className={`w-full py-2.5 rounded-lg text-sm font-medium ${
              tier.popular ? 'bg-swift-500 hover:bg-swift-600' : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
            }`}>Choose {tier.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
