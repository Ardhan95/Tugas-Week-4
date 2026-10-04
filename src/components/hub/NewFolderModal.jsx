import React, { useState } from 'react';
import { X, FolderPlus, Palette } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function NewFolderModal({ isOpen, onClose, onAddFolder }) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#38bdf8');

  if (!isOpen) return null;

  const colors = ['#38bdf8', '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#f87171'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    soundFX.playPop();
    onAddFolder({
      id: 'folder-' + Date.now(),
      name: name.trim(),
      count: 0,
      color: color,
      icon: 'folder'
    });
    setName('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-slate-900 border border-white/15 rounded-3xl p-5 shadow-2xl animate-fadeIn text-left"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FolderPlus size={20} className="text-cyan-400" />
            <h3 className="text-base font-bold text-white">Buat Folder Baru</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5">Nama Folder</label>
            <input
              type="text"
              placeholder="Contoh: Instagram Reels, Vlog 2026..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-medium outline-none focus:border-cyan-400"
              autoFocus
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Palette size={13} />
              Warna Ikon Folder
            </label>
            <div className="flex items-center gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2 px-4"
            >
              Simpan Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
