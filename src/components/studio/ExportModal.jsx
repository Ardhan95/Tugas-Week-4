import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Sparkles, 
  Film, 
  Check, 
  Share2, 
  Smartphone, 
  PlaySquare, 
  Tv, 
  Layers, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audioEngine';

export default function ExportModal({ isOpen, onClose, project }) {
  const [resolution, setResolution] = useState('1080p');
  const [fps, setFps] = useState(60);
  const [format, setFormat] = useState('mp4');
  const [isWatermark, setIsWatermark] = useState(false);
  
  // Render state
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [renderedFrames, setRenderedFrames] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRendering) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRendering(false);
            setIsFinished(true);
            soundFX.playChime();
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
            return 100;
          }
          const increment = Math.floor(Math.random() * 8) + 4;
          const nextVal = Math.min(100, prev + increment);
          setRenderedFrames(Math.floor((nextVal / 100) * (project.duration || 30) * fps));
          return nextVal;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isRendering, project.duration, fps]);

  if (!isOpen) return null;

  const handleStartRender = () => {
    soundFX.playPop();
    setIsRendering(true);
    setProgress(0);
    setRenderedFrames(0);
    setIsFinished(false);
  };

  const handleDownload = () => {
    soundFX.playChime();
    // Create a simulated downloadable file blob
    const content = `CapCut Studio Pro Video Export\nTitle: ${project.title}\nResolution: ${resolution}\nFPS: ${fps}\nFormat: ${format.toUpperCase()}\nExported At: ${new Date().toISOString()}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.replace(/[^a-zA-Z0-9]/g, '_')}_${resolution}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resolutions = [
    { id: '720p', label: '720p HD', desc: 'Ukuran kecil & cepat', bit: '8 Mbps' },
    { id: '1080p', label: '1080p Full HD', desc: 'Standar kualitas terbaik', bit: '16 Mbps' },
    { id: '4k', label: '4K Ultra HD', desc: 'Ketajaman sinematik 2160p', bit: '45 Mbps' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl overflow-hidden relative animate-fadeIn text-left"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/25">
              <Download size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Ekspor Video & Render</h3>
              <p className="text-xs text-slate-400">{project.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Configuration Body if not rendering / not finished */}
        {!isRendering && !isFinished && (
          <div className="my-5 space-y-4">
            {/* Resolution selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Resolusi Video
              </label>
              <div className="grid grid-cols-3 gap-2">
                {resolutions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setResolution(r.id);
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col transition ${
                      resolution === r.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                        : 'bg-slate-950/70 border-white/5 hover:border-white/15 text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{r.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{r.bit}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FPS & Format selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Kecepatan Frame
                </label>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10">
                  {[24, 30, 60].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFps(f)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                        fps === f ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      {f} FPS
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Format Berkas
                </label>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-white/10">
                  {['mp4', 'webm', 'gif'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                        format === fmt ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Info Banner */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                Bebas Watermark & Akselerasi GPU Aktif
              </span>
              <span className="font-mono text-cyan-400 font-bold">~{project.size || '34 MB'}</span>
            </div>

            <button
              onClick={handleStartRender}
              className="w-full btn-primary text-sm py-3.5 shadow-xl shadow-cyan-500/25 mt-2 flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              Mulai Render & Unduh Video
            </button>
          </div>
        )}

        {/* Live Rendering Progress View */}
        {isRendering && (
          <div className="my-8 text-center space-y-5">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-2xl font-extrabold text-white">{progress}%</span>
                <span className="text-[10px] text-cyan-400 font-semibold">RENDERING</span>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold text-white mb-1">Sedang Menyatukan Track Video & Audio...</h4>
              <p className="text-xs text-slate-400 font-mono">
                Frame Ter-render: {renderedFrames} / {Math.floor((project.duration || 30) * fps)} frame
              </p>
            </div>

            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Finished / Success View */}
        {isFinished && (
          <div className="my-6 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/30">
              <Check size={32} />
            </div>

            <div>
              <h4 className="text-lg font-extrabold text-white">Video Berhasil Di-render! 🎉</h4>
              <p className="text-xs text-slate-400 mt-1">
                Kualitas: {resolution} • {fps} FPS • {format.toUpperCase()}
              </p>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full btn-primary text-sm py-3.5 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Unduh Berkas Video Sekarang ({project.title}.{format})
            </button>

            {/* Quick Share options */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-xs text-slate-400 block mb-2 font-medium">Bagikan Langsung ke:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => alert('🚀 Membuka TikTok Creator Studio upload interface!')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
                >
                  <Smartphone size={15} className="text-pink-400" />
                  TikTok Video
                </button>
                <button
                  onClick={() => alert('🚀 Membuka YouTube Shorts upload interface!')}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
                >
                  <PlaySquare size={15} className="text-red-400" />
                  YouTube Shorts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
