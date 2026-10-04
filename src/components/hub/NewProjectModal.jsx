import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Video, 
  Smartphone, 
  Square, 
  Tv, 
  Film, 
  Upload, 
  Music, 
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function NewProjectModal({ isOpen, onClose, onCreateProject }) {
  const [title, setTitle] = useState('Proyek Baru ' + new Date().toLocaleDateString('id-ID'));
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [folder, setFolder] = useState('Bawaan');
  const [fps, setFps] = useState(60);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  if (!isOpen) return null;

  const aspectRatios = [
    { id: '16:9', label: '16:9 Landscape', desc: 'YouTube, TV, PC', icon: Tv },
    { id: '9:16', label: '9:16 Portrait', desc: 'TikTok, Reels, Shorts', icon: Smartphone },
    { id: '1:1', label: '1:1 Persegi', desc: 'Instagram Feed, Post', icon: Square },
    { id: '4:5', label: '4:5 Potret', desc: 'Instagram Portrait', icon: Film },
    { id: '21:9', label: '21:9 Sinema', desc: 'Layar Bioskop Lebar', icon: Video }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    soundFX.playPop();

    // Default media based on aspect ratio
    let thumb = '/assets/damri_bus.jpg';
    if (aspectRatio === '9:16') thumb = '/assets/bus_pov.jpg';
    if (aspectRatio === '1:1') thumb = '/assets/fashion_sleeves.jpg';

    const newProj = {
      id: 'proj-' + Date.now(),
      title: title.trim() || 'Proyek Baru',
      duration: 30,
      formattedDuration: '0:30.00',
      folder: folder,
      date: 'Hari ini',
      thumbnail: thumb,
      aspectRatio: aspectRatio,
      fps: fps,
      size: '12.4 MB',
      tags: ['Baru', aspectRatio],
      videoType: aspectRatio === '9:16' ? 'bus_pov' : 'bus_drive',
      filter: 'normal',
      clips: [
        { 
          id: 'c-' + Date.now(), 
          type: 'video', 
          name: 'Klip Utama', 
          start: 0, 
          duration: 15, 
          speed: 1, 
          volume: 100, 
          thumbnail: thumb 
        }
      ],
      audioClips: [
        { 
          id: 'a-' + Date.now(), 
          name: 'Audio Latar Default', 
          start: 0, 
          duration: 15, 
          volume: 80, 
          waveColor: '#38bdf8' 
        }
      ],
      textClips: [
        { 
          id: 't-' + Date.now(), 
          text: title.toUpperCase(), 
          start: 1, 
          duration: 4, 
          font: 'Plus Jakarta Sans', 
          color: '#00E5FF', 
          size: 26, 
          style: 'bold_stroke', 
          x: 50, 
          y: 75 
        }
      ],
      stickers: []
    };

    onCreateProject(newProj);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl overflow-hidden relative animate-fadeIn text-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
              <PlusCircle size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Buat Proyek Baru</h3>
              <p className="text-xs text-slate-400">Pilih aspek rasio dan format video editor</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-5">
          {/* Project Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Nama Proyek
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Vlog Perjalanan Bis DAMRI..."
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white font-medium focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none transition"
              required
            />
          </div>

          {/* Aspect Ratio Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Aspek Rasio Kanvas
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {aspectRatios.map((item) => {
                const Icon = item.icon;
                const isSelected = aspectRatio === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setAspectRatio(item.id);
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col items-start transition duration-150 relative ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-md shadow-cyan-500/15 text-white'
                        : 'bg-slate-950/60 border-white/5 hover:border-white/15 text-slate-300'
                    }`}
                  >
                    <Icon size={20} className={isSelected ? 'text-cyan-400' : 'text-slate-400'} />
                    <span className="text-xs font-bold mt-2">{item.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{item.desc}</span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame Rate & Folder */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Frame Rate (FPS)
              </label>
              <select
                value={fps}
                onChange={(e) => setFps(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none focus:border-cyan-400 transition"
              >
                <option value={24}>24 FPS (Cinematic Film)</option>
                <option value={30}>30 FPS (Standar Video)</option>
                <option value={60}>60 FPS (Ultra Smooth)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Simpan ke Folder
              </label>
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none focus:border-cyan-400 transition"
              >
                <option value="Bawaan">📁 Bawaan</option>
                <option value="Travel Vlog">📁 Travel Vlog</option>
                <option value="Shorts & TikTok">📁 Shorts & TikTok</option>
                <option value="Impor">📁 Impor</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary text-xs py-2.5 px-5"
            >
              Mulai Edit Video
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
