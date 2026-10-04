import React from 'react';
import { Smartphone, Monitor, Sparkles } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function DeviceFrameWrapper({
  children,
  isMobileFrame,
  onToggleFrame
}) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-start relative">
      {/* Top Global Mode Bar for Desktop user convenience */}
      <div className="w-full bg-slate-900/90 border-b border-white/10 px-4 py-2 flex items-center justify-between z-40 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-extrabold text-white tracking-wide">
            CAPCUT STUDIO PRO <span className="text-cyan-400">v3.7</span>
          </span>
          <span className="hidden sm:inline text-slate-500">• Web Video Editing Suite</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onToggleFrame();
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 font-bold transition shadow-sm"
          >
            {isMobileFrame ? (
              <>
                <Monitor size={14} />
                <span>Mode Tampilan Desktop</span>
              </>
            ) : (
              <>
                <Smartphone size={14} />
                <span>Mode Tampilan HP (Screenshot)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main App Container: Either Mobile phone casing or Fullscreen container */}
      <div className="w-full flex-1 flex flex-col items-center justify-start p-0 sm:p-4">
        {isMobileFrame ? (
          <div className="mobile-device-container my-2 sm:my-4 border border-white/15">
            {/* Phone Speaker & Camera Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/5">
              <div className="w-3 h-3 rounded-full bg-black/80 mr-2 border border-white/10" />
              <div className="w-10 h-1 bg-slate-800 rounded-full" />
            </div>

            {/* Phone Screen */}
            <div className="mobile-device-inner">
              {children}
            </div>
          </div>
        ) : (
          <div className="w-full h-full min-h-[calc(100vh-48px)] flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
