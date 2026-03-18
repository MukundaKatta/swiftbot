'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { mockFleet, mockDiagnostics, mockFirmware, mockPricing, mockDeployments } from '@/lib/mock-data';
import { Map, Bot, Trophy, Download, Wrench, DollarSign, Rocket, ChevronRight } from 'lucide-react';
import FleetMap from '@/components/FleetMap';
import UnitDetail from '@/components/UnitDetail';
import Leaderboard from '@/components/Leaderboard';
import FirmwarePanel from '@/components/FirmwarePanel';
import DiagnosticsPanel from '@/components/DiagnosticsPanel';
import PricingConfigurator from '@/components/PricingConfigurator';
import DeploymentPlanner from '@/components/DeploymentPlanner';

const tabs = [
  { id: 'map', label: 'Fleet Map', icon: Map },
  { id: 'unit', label: 'Unit Detail', icon: Bot },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'firmware', label: 'Firmware', icon: Download },
  { id: 'diagnostics', label: 'Diagnostics', icon: Wrench },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'deployment', label: 'Deployment', icon: Rocket },
];

export default function HomePage() {
  const { activeTab, setActiveTab, setFleet, setDiagnostics, setFirmware, setPricing, setDeployments } = useStore();

  useEffect(() => {
    setFleet(mockFleet); setDiagnostics(mockDiagnostics); setFirmware(mockFirmware);
    setPricing(mockPricing); setDeployments(mockDeployments);
  }, [setFleet, setDiagnostics, setFirmware, setPricing, setDeployments]);

  const renderContent = () => {
    switch (activeTab) {
      case 'map': return <FleetMap />;
      case 'unit': return <UnitDetail />;
      case 'leaderboard': return <Leaderboard />;
      case 'firmware': return <FirmwarePanel />;
      case 'diagnostics': return <DiagnosticsPanel />;
      case 'pricing': return <PricingConfigurator />;
      case 'deployment': return <DeploymentPlanner />;
      default: return <FleetMap />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-56 bg-gray-900/50 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-swift-400 to-swift-600 bg-clip-text text-transparent">SwiftBot</h1>
          <p className="text-xs text-gray-500">Fleet Management</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  activeTab === t.id ? 'bg-swift-500/20 text-swift-400 border border-swift-500/30' : 'text-gray-400 hover:bg-gray-800/50'
                }`}>
                <Icon size={16} /><span className="flex-1 text-left">{t.label}</span>
                {activeTab === t.id && <ChevronRight size={12} />}
              </button>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
    </div>
  );
}
