import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  FastForward, 
  Rewind,
  Sparkles,
  Layers,
  Repeat
} from 'lucide-react';
import { filterPresets } from '../../data/initialData';
import { soundFX } from '../../utils/audioEngine';

export default function VideoPlayerCanvas({
  project,
  currentTime,
  setCurrentTime,
  isPlaying,
  setIsPlaying,
  totalDuration,
  onTextDrag,
  customAdjustmentCss
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeDragId, setActiveDragId] = useState(null);

  // Get active CSS filter
  const currentFilterObj = filterPresets.find(f => f.id === project.filter);
  const filterStyle = customAdjustmentCss && customAdjustmentCss !== 'none' 
    ? customAdjustmentCss 
    : currentFilterObj ? currentFilterObj.css : 'none';

  // Format time into MM:SS.ms
  const formatTimecode = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  // Keyboard shortcut listener (Spacebar = Play/Pause)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.code === 'Space') {
        e.preventDefault();
        soundFX.playClick();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Find active clips at currentTime
  const activeVideoClip = project.clips?.find(c => currentTime >= c.start && currentTime <= (c.start + c.duration)) || project.clips?.[0];
  const activeTexts = project.textClips?.filter(t => currentTime >= t.start && currentTime <= (t.start + t.duration)) || [];
  const activeStickers = project.stickers?.filter(s => currentTime >= s.start && currentTime <= (s.start + s.duration)) || [];

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    soundFX.playClick();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Calculate Aspect Ratio styling
  const getAspectRatioClasses = () => {
    switch (project.aspectRatio) {
      case '9:16': return 'aspect-[9/16] max-h-[520px]';
      case '1:1': return 'aspect-square max-h-[480px]';
      case '4:5': return 'aspect-[4/5] max-h-[500px]';
      case '21:9': return 'aspect-[21/9] w-full max-h-[360px]';
      case '16:9':
      default:
        return 'aspect-video w-full max-h-[440px]';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center p-3 sm:p-5 bg-slate-950/80 relative overflow-hidden"
    >
      {/* Video Canvas Container */}
      <div className={`relative ${getAspectRatioClasses()} bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center transition-all duration-300 group`}>
        {/* Background Visual Layer */}
        {activeVideoClip ? (
          <img
            src={activeVideoClip.thumbnail || project.thumbnail}
            alt="Preview Frame"
            className="w-full h-full object-cover transition-all duration-150"
            style={{ filter: filterStyle }}
          />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
            Tidak ada video pada waktu ini
          </div>
        )}

        {/* Dynamic Road Animation / Speed effect simulation on play */}
        {isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none animate-pulse" />
        )}

        {/* Render Text Overlays */}
        {activeTexts.map((textItem) => (
          <div
            key={textItem.id}
            style={{
              position: 'absolute',
              left: `${textItem.x}%`,
              top: `${textItem.y}%`,
              transform: 'translate(-50%, -50%)',
              color: textItem.color || '#ffffff',
              fontSize: `${textItem.size || 24}px`,
              fontFamily: textItem.font || 'sans-serif',
              zIndex: 20,
              userSelect: 'none'
            }}
            className={`cursor-move px-3 py-1 font-black text-center ${
              textItem.style === 'bold_stroke'
                ? 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] stroke-black'
                : textItem.style === 'neon'
                ? 'glow-text'
                : textItem.style === 'karaoke'
                ? 'bg-black/75 text-yellow-400 rounded-xl border border-yellow-400/40 shadow-lg'
                : ''
            }`}
          >
            {textItem.text}
          </div>
        ))}

        {/* Render Sticker Overlays */}
        {activeStickers.map((sticker) => (
          <div
            key={sticker.id}
            style={{
              position: 'absolute',
              left: `${sticker.x}%`,
              top: `${sticker.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${sticker.size || 20}px`,
              zIndex: 25,
              userSelect: 'none'
            }}
            className="cursor-move font-black px-2 py-1 bg-black/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-md animate-bounce"
          >
            {sticker.text}
          </div>
        ))}

        {/* Aspect Ratio Guide Watermark Overlay */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition">
          {project.aspectRatio} • {project.fps} FPS
        </div>
      </div>

      {/* Playback Controls Toolbar */}
      <div className="w-full max-w-xl bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5 mt-3 flex items-center justify-between shadow-xl">
        {/* Timecode */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-slate-300 font-bold">
          <span className="text-cyan-400">{formatTimecode(currentTime)}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">{formatTimecode(totalDuration)}</span>
        </div>

        {/* Center Controls (Rewind, Play, Forward) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playClick();
              setCurrentTime(Math.max(0, currentTime - 1));
            }}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
            title="Mundur 1 Detik (-1s)"
          >
            <Rewind size={15} />
          </button>

          <button
            onClick={() => {
              soundFX.playPop();
              setIsPlaying(!isPlaying);
            }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition"
            title={isPlaying ? 'Jeda (Spasi)' : 'Putar Video (Spasi)'}
          >
            {isPlaying ? (
              <Pause size={20} className="fill-current" />
            ) : (
              <Play size={20} className="fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setCurrentTime(Math.min(totalDuration, currentTime + 1));
            }}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition"
            title="Maju 1 Detik (+1s)"
          >
            <FastForward size={15} />
          </button>
        </div>

        {/* Right side (Loop, Volume, Fullscreen) */}
        <div className="flex items-center gap-2">
          {/* Loop toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsLooping(!isLooping);
            }}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition ${
              isLooping
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-400'
            }`}
            title="Putar Ulang Otomatis (Loop)"
          >
            <Repeat size={14} />
          </button>

          {/* Volume toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsMuted(!isMuted);
            }}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            title={isMuted ? 'Buka Suara' : 'Bisukan Suara'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
            title="Layar Penuh"
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
