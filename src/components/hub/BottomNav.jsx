import React from 'react';
import { Home, Compass, Sparkles, Crown, User, Search, Clapperboard } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function BottomNav({ 
  activeNav, 
  setActiveNav, 
  isMobileFrame,
  onOpenNewProject 
}) {
  const navItems = [
    { id: 'edit', label: 'Edit', icon: Clapperboard },
    { id: 'template', label: 'Template', icon: Search },
    { id: 'eksplor', label: 'Eksplor', icon: Compass },
    { id: 'vip', label: 'VIP', icon: Crown },
    { id: 'saya', label: 'Saya', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 flex flex-col items-center">
      {/* 5 Bottom Nav Buttons */}
      <div className="w-full max-w-md mx-auto flex items-center justify-around py-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFX.playClick();
                setActiveNav(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition duration-150 relative ${
                isActive 
                  ? 'text-cyan-400 font-bold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon size={22} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
                {item.id === 'vip' && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Android Bottom Navigation Bar matching screenshot (|||  ⌂  <) */}
      {isMobileFrame && (
        <div className="w-full max-w-md mx-auto flex items-center justify-around py-1.5 px-12 border-t border-white/5 text-slate-500">
          <button className="p-1 hover:text-slate-300 transition text-sm font-mono tracking-tighter">
            |||
          </button>
          <button className="w-3.5 h-3.5 rounded-sm border-2 border-slate-500 hover:border-slate-300 transition" />
          <button className="p-1 hover:text-slate-300 transition text-sm font-bold">
            &lt;
          </button>
        </div>
      )}
    </div>
  );
}
