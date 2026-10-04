import React, { useRef } from 'react';
import { 
  Scissors, 
  Trash2, 
  Copy, 
  Gauge, 
  Volume2, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Magnet, 
  Film, 
  Music, 
  Type, 
  Smile, 
  Plus
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function TimelineEditor({
  project,
  currentTime,
  setCurrentTime,
  totalDuration,
  selectedItemId,
  setSelectedItemId,
  onSplitClip,
  onDeleteClip,
  onDuplicateClip,
  onChangeSpeed,
  zoomLevel,
  setZoomLevel
}) {
  const timelineRef = useRef(null);

  // Time to pixels multiplier based on zoomLevel (e.g., 20px per second)
  const pixelsPerSec = 24 * zoomLevel;
  const timelineWidth = Math.max(800, totalDuration * pixelsPerSec);

  // Timeline click to scrub playhead
  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left + timelineRef.current.scrollLeft;
    const newTime = Math.max(0, Math.min(totalDuration, clickX / pixelsPerSec));
    setCurrentTime(newTime);
  };

  // Generate ruler tick marks
  const rulerTicks = [];
  const step = zoomLevel < 1 ? 5 : zoomLevel > 2 ? 1 : 2;
  for (let t = 0; t <= totalDuration + 5; t += step) {
    const mins = Math.floor(t / 60);
    const secs = t % 60;
    rulerTicks.push({
      time: t,
      label: `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    });
  }

  return (
    <div className="w-full bg-slate-950 border-t border-white/10 flex flex-col select-none z-20">
      {/* Timeline Action Toolbar */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-xs overflow-x-auto">
        {/* Left Editing Tools */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Split Clip Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onSplitClip();
            }}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-white font-bold flex items-center gap-1.5 border border-white/5 transition active:scale-95"
            title="Bagi Klip pada Posisi Playhead (S)"
          >
            <Scissors size={14} className="text-cyan-400" />
            <span>Bagi (Split)</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              soundFX.playGlitch();
              onDeleteClip();
            }}
            disabled={!selectedItemId}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition ${
              selectedItemId 
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30 hover:bg-rose-500/30' 
                : 'bg-white/5 text-slate-500 border-transparent cursor-not-allowed'
            }`}
            title="Hapus Klip Terpilih (Delete)"
          >
            <Trash2 size={14} />
            <span>Hapus</span>
          </button>

          {/* Duplicate Button */}
          <button
            onClick={() => {
              soundFX.playPop();
              onDuplicateClip();
            }}
            disabled={!selectedItemId}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition ${
              selectedItemId 
                ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' 
                : 'bg-white/5 text-slate-500 border-transparent cursor-not-allowed'
            }`}
            title="Duplikat Klip"
          >
            <Copy size={14} />
            <span>Duplikat</span>
          </button>

          {/* Speed Ramp */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-0.5 border border-white/5 ml-1">
            <Gauge size={13} className="text-cyan-400 ml-1.5" />
            {[0.5, 1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  soundFX.playClick();
                  onChangeSpeed(speed);
                }}
                className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white hover:bg-white/10"
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Right Zoom & Magnet Tools */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-xl border border-white/5">
            <button
              onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
              className="text-slate-400 hover:text-white p-0.5"
              title="Perkecil Timeline"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-[10px] font-mono text-slate-400 min-w-[28px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.25))}
              className="text-slate-400 hover:text-white p-0.5"
              title="Perbesar Timeline"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Timeline Workspace */}
      <div 
        ref={timelineRef}
        onClick={handleTimelineClick}
        className="relative overflow-x-auto overflow-y-hidden p-3 bg-slate-950 scrollbar-thin"
        style={{ minHeight: '230px' }}
      >
        <div style={{ width: `${timelineWidth}px` }} className="relative">
          {/* Time Ruler */}
          <div className="h-6 border-b border-white/10 relative flex items-end pb-1 mb-2">
            {rulerTicks.map((tick) => (
              <div
                key={tick.time}
                className="absolute text-[10px] font-mono text-slate-500 border-l border-white/20 pl-1 h-3 flex items-end"
                style={{ left: `${tick.time * pixelsPerSec}px` }}
              >
                {tick.label}
              </div>
            ))}
          </div>

          {/* Red Playhead / Scrubber Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 z-30 pointer-events-none shadow-[0_0_8px_#00e5ff]"
            style={{ left: `${currentTime * pixelsPerSec}px` }}
          >
            {/* Playhead Handle */}
            <div className="w-3.5 h-3.5 bg-cyan-400 -translate-x-[6px] -translate-y-1 rotate-45 rounded-sm shadow-md" />
          </div>

          {/* Track 1: VIDEO TRACK */}
          <div className="relative h-14 bg-slate-900/80 rounded-xl border border-white/10 mb-2 overflow-hidden flex items-center px-1">
            <div className="absolute left-2 top-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 z-10">
              <Film size={11} className="text-cyan-400" />
              Trek Video
            </div>
            {project.clips?.map((clip) => {
              const isSelected = selectedItemId === clip.id;
              return (
                <div
                  key={clip.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    setSelectedItemId(clip.id);
                  }}
                  style={{
                    left: `${clip.start * pixelsPerSec}px`,
                    width: `${Math.max(40, clip.duration * pixelsPerSec)}px`
                  }}
                  className={`absolute h-11 rounded-lg top-1.5 overflow-hidden flex items-center p-1.5 cursor-pointer border transition shadow-md ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-950/80 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'border-white/15 bg-slate-800 hover:bg-slate-750'
                  }`}
                >
                  <img
                    src={clip.thumbnail || project.thumbnail}
                    alt={clip.name}
                    className="w-9 h-8 object-cover rounded shrink-0 mr-2 border border-white/10"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate">{clip.name}</span>
                    <span className="text-[9px] text-slate-400 font-mono">{clip.duration}s • {clip.speed || 1}x</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Track 2: AUDIO TRACK */}
          <div className="relative h-11 bg-slate-900/60 rounded-xl border border-white/10 mb-2 overflow-hidden flex items-center px-1">
            <div className="absolute left-2 top-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 z-10">
              <Music size={11} className="text-purple-400" />
              Trek Audio & SFX
            </div>
            {project.audioClips?.map((audio) => {
              const isSelected = selectedItemId === audio.id;
              return (
                <div
                  key={audio.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    setSelectedItemId(audio.id);
                  }}
                  style={{
                    left: `${audio.start * pixelsPerSec}px`,
                    width: `${Math.max(40, audio.duration * pixelsPerSec)}px`,
                    backgroundColor: isSelected ? 'rgba(168, 85, 247, 0.3)' : 'rgba(147, 51, 234, 0.2)'
                  }}
                  className={`absolute h-8 rounded-lg top-1.5 overflow-hidden flex items-center px-2.5 cursor-pointer border ${
                    isSelected ? 'border-purple-400 ring-2 ring-purple-400' : 'border-purple-500/40'
                  }`}
                >
                  {/* Procedural Waveform lines */}
                  <div className="flex items-center gap-0.5 h-full opacity-60 mr-2">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-purple-400 rounded-full"
                        style={{ height: `${20 + (i % 5) * 15}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-purple-200 truncate">{audio.name}</span>
                </div>
              );
            })}
          </div>

          {/* Track 3: TEXT & SUBTITLE TRACK */}
          <div className="relative h-10 bg-slate-900/40 rounded-xl border border-white/5 mb-2 overflow-hidden flex items-center px-1">
            <div className="absolute left-2 top-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 z-10">
              <Type size={11} className="text-amber-400" />
              Trek Teks & Subtitel
            </div>
            {project.textClips?.map((text) => {
              const isSelected = selectedItemId === text.id;
              return (
                <div
                  key={text.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    setSelectedItemId(text.id);
                  }}
                  style={{
                    left: `${text.start * pixelsPerSec}px`,
                    width: `${Math.max(40, text.duration * pixelsPerSec)}px`
                  }}
                  className={`absolute h-7 rounded-lg top-1.5 overflow-hidden flex items-center px-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/30 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <span className="text-[11px] font-bold text-amber-300 truncate">{text.text}</span>
                </div>
              );
            })}
          </div>

          {/* Track 4: STICKERS TRACK */}
          {project.stickers && project.stickers.length > 0 && (
            <div className="relative h-9 bg-slate-900/30 rounded-xl border border-white/5 overflow-hidden flex items-center px-1">
              <div className="absolute left-2 top-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 z-10">
                <Smile size={10} className="text-pink-400" />
                Stiker
              </div>
              {project.stickers.map((stk) => (
                <div
                  key={stk.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    setSelectedItemId(stk.id);
                  }}
                  style={{
                    left: `${stk.start * pixelsPerSec}px`,
                    width: `${Math.max(30, stk.duration * pixelsPerSec)}px`
                  }}
                  className="absolute h-6 rounded-lg top-1.5 bg-pink-500/20 border border-pink-400/40 flex items-center px-2 text-[10px] font-bold text-pink-300 cursor-pointer"
                >
                  {stk.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
