import React from 'react';
import { 
  Home, 
  PlusCircle, 
  Clock, 
  Compass, 
  FileText, 
  Settings, 
  ArrowRight 
} from 'lucide-react';
import { TruthLensLogo } from './TruthLensLogo.tsx';
import { AiIcon } from './AiIcon.tsx';
import { triggerHaptic } from '../utils/haptics.ts';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenUpload?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, onOpenUpload }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'new-analysis', label: 'New Analysis', icon: PlusCircle, action: onOpenUpload },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'ai', label: 'AI Assistant', icon: AiIcon },
    { id: 'origin-trace', label: 'Origin Trace', icon: Compass },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="glass-panel w-64 shrink-0 flex flex-col justify-between py-6 px-4 h-screen sticky top-0 z-20 select-none font-sans border-r border-[#565449]/[0.18]">
      <div>
        {/* Brand Header with Refined Forensic Lens & Editorial Lockup */}
        <div 
          onClick={() => {
            triggerHaptic('tap');
            onSelectTab('home');
          }}
          className="px-2 py-1.5 cursor-pointer mb-7 group transition-all"
        >
          <TruthLensLogo size="md" />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  triggerHaptic('selection');
                  if (item.action) {
                    item.action();
                  }
                  onSelectTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-sans transition-all cursor-pointer ${
                  isActive
                    ? 'btn-primary-solid font-semibold text-[#FFFBF4]'
                    : 'text-[#565449] hover:text-[#11120D] hover:bg-[#D8CFBC]/25 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFFBF4] stroke-[2.2]' : 'text-[#565449] stroke-[1.8]'}`} />
                <span className="tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: TruthLens AI Assistant Mini Card */}
      <div className="pt-5 border-t border-[#565449]/15">
        <div 
          onClick={() => {
            triggerHaptic('selection');
            onSelectTab('ai');
          }}
          className="glass-bone p-3.5 rounded-2xl cursor-pointer group"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#11120D] text-[#FFFBF4] flex items-center justify-center shrink-0 shadow-2xs">
              <AiIcon className="w-4 h-4 text-[#FFFBF4]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-sans font-semibold text-[#11120D] leading-tight">
                Authenticity Copilot
              </div>
              <div className="font-serif text-sm font-bold text-[#11120D] leading-tight">
                TruthLens AI
              </div>
              <div className="text-[10px] text-[#565449] mt-0.5">
                Explain verdict &amp; anomalies
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-xs font-sans font-semibold text-[#11120D] pt-2 border-t border-[#565449]/10">
            <span>Ask Forensic Question</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#565449] group-hover:translate-x-1 group-hover:text-[#11120D] transition-all" />
          </div>
        </div>
      </div>
    </aside>
  );
};
