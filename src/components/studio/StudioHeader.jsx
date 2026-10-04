import React, { useState } from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  RotateCw, 
  Download, 
  Tv, 
  Smartphone, 
  Square, 
  Film, 
  Video, 
  Check, 
  Cloud, 
  Monitor, 
  Share2,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function StudioHeader({
  project,
  onBackToHub,
  onUpdateProject,
  onOpenExport,
  isMobileFrame,
  onToggleFrameMode
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(project.title);

  const aspectRatios = ['16:9', '9:16', '1:1', '4:5', '21:9'];

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onUpdateProject({ ...project, title: titleInput.trim() });
    }
  };

  return (
    <header className="w-full bg-slate-950 border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-30 sticky top-0">
      {/* Left section: Back button & Project Name */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            soundFX.playClick();
            onBackToHub();
          }}
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition border border-white/5"
          title="Kembali ke Daftar Proyek"
        >
          <ArrowLeft size={18} />
        </button>

        {isEditingTitle ? (
          <form onSubmit={handleTitleSubmit} className="flex items-center gap-1.5">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={() => {
                setIsEditingTitle(false);
                if (titleInput.trim()) onUpdateProject({ ...project, title: titleInput.trim() });
              }}
              autoFocus
              className="bg-slate-900 border border-cyan-400 rounded-lg px-2.5 py-1 text-sm font-bold text-white outline-none"
            />
            <button type="submit" className="text-cyan-400 p-1">
              <Check size={16} />
            </button>
          </form>
        ) : (
          <div 
            onClick={() => setIsEditingTitle(true)}
            className="group cursor-pointer flex items-center gap-2 max-w-[200px] sm:max-w-[320px]"
            title="Klik untuk mengubah nama proyek"
          >
            <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-400 transition truncate">
              {project.title}
            </h2>
            <span className="text-[10px] text-slate-500 group-hover:text-slate-400 opacity-0 group-hover:opacity-100 transition">
              ✎
            </span>
          </div>
        )}

        {/* Cloud Auto-save Badge */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <Cloud size={12} />
          <span>Tersimpan Otomatis</span>
        </div>
      </div>

      {/* Center section: Aspect Ratio & History */}
      <div className="flex items-center gap-2">
        {/* Aspect Ratio Switcher */}
        <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-white/10">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio}
              onClick={() => {
                soundFX.playClick();
                onUpdateProject({ ...project, aspectRatio: ratio });
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                project.aspectRatio === ratio
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>

        {/* Undo / Redo */}
        <div className="hidden sm:flex items-center gap-1">
          <button 
            onClick={() => soundFX.playClick()}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={14} />
          </button>
          <button 
            onClick={() => soundFX.playClick()}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={14} />
          </button>
        </div>
      </div>

      {/* Right section: Frame Mode Toggle & Export Button */}
      <div className="flex items-center gap-2">
        {/* Frame Toggle */}
        <button
          onClick={() => {
            soundFX.playClick();
            onToggleFrameMode();
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 border border-white/5 transition"
          title="Ganti Mode Tampilan Ponsel / Desktop Studio"
        >
          {isMobileFrame ? (
            <>
              <Monitor size={14} className="text-cyan-400" />
              <span>Layar Penuh</span>
            </>
          ) : (
            <>
              <Smartphone size={14} className="text-cyan-400" />
              <span>Frame HP</span>
            </>
          )}
        </button>

        {/* Export Button */}
        <button
          onClick={() => {
            soundFX.playPop();
            onOpenExport();
          }}
          className="btn-primary text-xs py-2 px-3.5 sm:px-4 shadow-lg shadow-cyan-500/20"
        >
          <Download size={14} />
          <span className="font-bold">Ekspor Video</span>
        </button>
      </div>
    </header>
  );
}
