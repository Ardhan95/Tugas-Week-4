import React from 'react';
import { 
  FolderOpen, 
  Music, 
  Type, 
  Wand2, 
  Layers, 
  Smile, 
  Scissors, 
  Sliders, 
  Bot, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function StudioSidebar({ activeTool, onSelectTool }) {
  const tools = [
    { id: 'media', label: 'Media', icon: FolderOpen },
    { id: 'audio', label: 'Audio & Musik', icon: Music },
    { id: 'text', label: 'Teks & Judul', icon: Type },
    { id: 'effects', label: 'Filter & Efek', icon: Wand2 },
    { id: 'transitions', label: 'Transisi', icon: Layers },
    { id: 'stickers', label: 'Stiker & Emoji', icon: Smile },
    { id: 'ai', label: 'Alat AI', icon: Bot },
    { id: 'adjust', label: 'Penyesuaian', icon: SlidersHorizontal }
  ];

  return (
    <aside className="w-16 sm:w-20 bg-slate-950/90 border-r border-white/10 flex flex-col items-center py-3 gap-1 shrink-0 z-20">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            onClick={() => {
              soundFX.playClick();
              onSelectTool(isActive ? null : tool.id);
            }}
            className={`w-14 sm:w-16 py-2.5 px-1 rounded-2xl flex flex-col items-center justify-center transition-all duration-150 relative ${
              isActive
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-md shadow-cyan-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Icon size={19} className={isActive ? 'text-cyan-400 stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[9px] sm:text-[10px] mt-1 tracking-tight text-center leading-tight">
              {tool.label}
            </span>
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r-full" />
            )}
          </button>
        );
      })}
    </aside>
  );
}
