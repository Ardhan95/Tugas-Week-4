import React from 'react';
import { 
  X, 
  Type, 
  Volume2, 
  Gauge, 
  Clock, 
  Move, 
  Palette, 
  Sparkles, 
  Trash2,
  Sliders
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function ClipInspector({
  selectedItemId,
  project,
  onUpdateClip,
  onDeleteClip,
  onClose
}) {
  if (!selectedItemId) return null;

  // Find the selected item across tracks
  const videoClip = project.clips?.find(c => c.id === selectedItemId);
  const audioClip = project.audioClips?.find(a => a.id === selectedItemId);
  const textClip = project.textClips?.find(t => t.id === selectedItemId);
  const stickerItem = project.stickers?.find(s => s.id === selectedItemId);

  return (
    <div className="w-72 bg-slate-900 border-l border-white/10 p-4 flex flex-col h-full shrink-0 z-10 text-left overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sliders size={14} className="text-cyan-400" />
          Inspektur Properti
        </h3>
        <button 
          onClick={onClose}
          className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>

      {/* --- VIDEO CLIP PROPERTIES --- */}
      {videoClip && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-400 mb-1">Nama Klip</label>
            <input
              type="text"
              value={videoClip.name}
              onChange={(e) => onUpdateClip('video', videoClip.id, { name: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-medium outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Volume Klip</span>
              <span className="font-mono text-cyan-400">{videoClip.volume || 80}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="150"
              value={videoClip.volume || 80}
              onChange={(e) => onUpdateClip('video', videoClip.id, { volume: Number(e.target.value) })}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Durasi Klip (Detik)</span>
              <span className="font-mono text-cyan-400">{videoClip.duration}s</span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              value={videoClip.duration}
              onChange={(e) => onUpdateClip('video', videoClip.id, { duration: Number(e.target.value) })}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      )}

      {/* --- AUDIO CLIP PROPERTIES --- */}
      {audioClip && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-400 mb-1">Nama Audio / Musik</label>
            <input
              type="text"
              value={audioClip.name}
              onChange={(e) => onUpdateClip('audio', audioClip.id, { name: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-medium outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Tingkat Volume</span>
              <span className="font-mono text-purple-400">{audioClip.volume || 80}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={audioClip.volume || 80}
              onChange={(e) => onUpdateClip('audio', audioClip.id, { volume: Number(e.target.value) })}
              className="w-full accent-purple-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Durasi Audio</span>
              <span className="font-mono text-purple-400">{audioClip.duration}s</span>
            </div>
            <input
              type="range"
              min="2"
              max="120"
              value={audioClip.duration}
              onChange={(e) => onUpdateClip('audio', audioClip.id, { duration: Number(e.target.value) })}
              className="w-full accent-purple-400"
            />
          </div>
        </div>
      )}

      {/* --- TEXT CLIP PROPERTIES --- */}
      {textClip && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-400 mb-1">Isi Teks / Subtitle</label>
            <textarea
              rows={2}
              value={textClip.text}
              onChange={(e) => onUpdateClip('text', textClip.id, { text: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white font-bold outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-400 mb-1">Gaya Font</label>
            <select
              value={textClip.font}
              onChange={(e) => onUpdateClip('text', textClip.id, { font: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-2 text-white font-semibold outline-none focus:border-cyan-400"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern)</option>
              <option value="Space Grotesk">Space Grotesk (Tech / Bold)</option>
              <option value="Inter">Inter (Clean Minimal)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Ukuran Huruf (Font Size)</span>
              <span className="font-mono text-amber-400">{textClip.size || 24}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="64"
              value={textClip.size || 24}
              onChange={(e) => onUpdateClip('text', textClip.id, { size: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Posisi Vertikal (Y)</span>
              <span className="font-mono text-amber-400">{textClip.y}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={textClip.y || 50}
              onChange={(e) => onUpdateClip('text', textClip.id, { y: Number(e.target.value) })}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-400 mb-1">Warna Teks</label>
            <div className="flex items-center gap-2">
              {['#ffffff', '#00E5FF', '#facc15', '#f43f5e', '#a855f7', '#4ade80'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onUpdateClip('text', textClip.id, { color: c })}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    textClip.color === c ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- STICKER PROPERTIES --- */}
      {stickerItem && (
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-400 mb-1">Teks Stiker</label>
            <input
              type="text"
              value={stickerItem.text}
              onChange={(e) => onUpdateClip('sticker', stickerItem.id, { text: e.target.value })}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-medium outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Ukuran Stiker</span>
              <span className="font-mono text-pink-400">{stickerItem.size || 20}px</span>
            </div>
            <input
              type="range"
              min="14"
              max="50"
              value={stickerItem.size || 20}
              onChange={(e) => onUpdateClip('sticker', stickerItem.id, { size: Number(e.target.value) })}
              className="w-full accent-pink-400"
            />
          </div>
        </div>
      )}

      {/* Delete Item CTA */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <button
          onClick={() => {
            soundFX.playGlitch();
            onDeleteClip();
          }}
          className="w-full py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
        >
          <Trash2 size={14} />
          Hapus Elemen Ini
        </button>
      </div>
    </div>
  );
}
