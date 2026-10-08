import React from 'react';
import { Home, Clock, User } from 'lucide-react';
import { AiIcon } from './AiIcon.tsx';
import { triggerHaptic } from '../utils/haptics.ts';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ai', label: 'AI', icon: AiIcon },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="glass-panel fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5 lg:hidden border-t border-[#565449]/[0.18] font-sans">
      <div className="grid grid-cols-4 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerHaptic('selection');
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
                isActive
                  ? 'text-[#11120D] font-bold'
                  : 'text-[#565449] hover:text-[#11120D]'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'card-active-smoky text-[#FFFBF4] scale-105' : 'text-[#565449]'}`}>
                <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold text-[#11120D]' : 'font-medium text-[#565449]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
