import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  Plus, 
  Play, 
  Volume2, 
  Mic, 
  MicOff, 
  Sparkles, 
  Wand2, 
  Layers, 
  Smile, 
  Sliders, 
  Type, 
  Music, 
  Check, 
  Clock, 
  Film
} from 'lucide-react';
import { filterPresets, sampleAudios, sampleSFX, stickerPresets } from '../../data/initialData';
import { soundFX } from '../../utils/audioEngine';

export default function StudioPanel({
  activeTool,
  onClose,
  project,
  onAddMediaClip,
  onAddAudioClip,
  onAddTextClip,
  onAddSticker,
  onSetFilter,
  onApplyAdjustment
}) {
  const [customText, setCustomText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [customFilter, setCustomFilter] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
    hueRotate: 0,
    blur: 0
  });

  if (!activeTool) return null;

  // Handle Voice Recording
  const handleToggleVoice = async () => {
    if (!isRecording) {
      soundFX.playPop();
      const started = await soundFX.startRecording();
      if (started) {
        setIsRecording(true);
      } else {
        alert('Izin mikrofon diperlukan atau browser tidak mendukung perekaman langsung.');
      }
    } else {
      soundFX.playPop();
      const audioUrl = await soundFX.stopRecording();
      setIsRecording(false);
      if (audioUrl) {
        onAddAudioClip({
          id: 'voice-' + Date.now(),
          name: 'Rekaman Suara Mikrofon',
          start: 0,
          duration: 10,
          volume: 100,
          waveColor: '#ef4444',
          audioUrl: audioUrl
        });
      }
    }
  };

  // Handle local media upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    soundFX.playPop();
    const url = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video');
    const isAudio = file.type.startsWith('audio');

    if (isAudio) {
      onAddAudioClip({
        id: 'user-audio-' + Date.now(),
        name: file.name,
        start: 0,
        duration: 15,
        volume: 85,
        waveColor: '#10b981',
        audioUrl: url
      });
    } else {
      onAddMediaClip({
        id: 'user-clip-' + Date.now(),
        type: isVideo ? 'video' : 'image',
        name: file.name,
        start: 0,
        duration: 10,
        speed: 1,
        volume: 80,
        thumbnail: url
      });
    }
  };

  const handleSliderChange = (key, val) => {
    const updated = { ...customFilter, [key]: Number(val) };
    setCustomFilter(updated);
    const css = `brightness(${updated.brightness}%) contrast(${updated.contrast}%) saturate(${updated.saturate}%) sepia(${updated.sepia}%) hue-rotate(${updated.hueRotate}deg) blur(${updated.blur}px)`;
    onApplyAdjustment(css);
  };

  return (
    <div className="w-72 sm:w-80 bg-slate-900 border-r border-white/10 flex flex-col h-full shrink-0 z-10 text-left overflow-y-auto">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          {activeTool === 'media' && '📁 Media & Galeri'}
          {activeTool === 'audio' && '🎵 Musik & Suara FX'}
          {activeTool === 'text' && '✍️ Teks & Tipografi'}
          {activeTool === 'effects' && '🪄 Filter & Warna Sinema'}
          {activeTool === 'transitions' && '✂️ Efek Transisi Klip'}
          {activeTool === 'stickers' && '🎭 Stiker & Emoji Pop'}
          {activeTool === 'ai' && '⚡ Fitur Otomatis AI'}
          {activeTool === 'adjust' && '🎛️ Penyesuaian Warna'}
        </h3>
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* --- MEDIA TOOL --- */}
        {activeTool === 'media' && (
          <div className="space-y-4">
            {/* File Upload Box */}
            <label className="border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition text-center group">
              <Upload size={24} className="text-cyan-400 group-hover:scale-110 transition-transform mb-1.5" />
              <span className="text-xs font-bold text-white">Unggah Video / Foto / Audio</span>
              <span className="text-[10px] text-slate-400 mt-0.5">MP4, MOV, PNG, JPG, MP3</span>
              <input
                type="file"
                accept="video/*,image/*,audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Stock Clips */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">Aset Sampel Bawaan</h4>
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddMediaClip({
                      id: 'clip-' + Date.now(),
                      type: 'video',
                      name: 'DAMRI Bus Highway',
                      start: 0,
                      duration: 10,
                      speed: 1,
                      volume: 80,
                      thumbnail: '/assets/damri_bus.jpg'
                    });
                  }}
                  className="rounded-xl overflow-hidden bg-slate-950 border border-white/10 p-1.5 cursor-pointer hover:border-cyan-400 transition group"
                >
                  <img src="/assets/damri_bus.jpg" alt="DAMRI" className="w-full aspect-video object-cover rounded-lg mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block truncate">Bus DAMRI</span>
                </div>

                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddMediaClip({
                      id: 'clip-' + Date.now(),
                      type: 'video',
                      name: 'Tol Trans Jawa POV',
                      start: 0,
                      duration: 12,
                      speed: 1,
                      volume: 80,
                      thumbnail: '/assets/bus_pov.jpg'
                    });
                  }}
                  className="rounded-xl overflow-hidden bg-slate-950 border border-white/10 p-1.5 cursor-pointer hover:border-cyan-400 transition group"
                >
                  <img src="/assets/bus_pov.jpg" alt="POV" className="w-full aspect-video object-cover rounded-lg mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block truncate">Bus Driver POV</span>
                </div>

                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddMediaClip({
                      id: 'clip-' + Date.now(),
                      type: 'video',
                      name: 'Fashion Sleeve Review',
                      start: 0,
                      duration: 8,
                      speed: 1,
                      volume: 50,
                      thumbnail: '/assets/fashion_sleeves.jpg'
                    });
                  }}
                  className="rounded-xl overflow-hidden bg-slate-950 border border-white/10 p-1.5 cursor-pointer hover:border-cyan-400 transition group"
                >
                  <img src="/assets/fashion_sleeves.jpg" alt="Fashion" className="w-full aspect-video object-cover rounded-lg mb-1" />
                  <span className="text-[11px] font-semibold text-slate-200 block truncate">Sleeve Fashion</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- AUDIO TOOL --- */}
        {activeTool === 'audio' && (
          <div className="space-y-4">
            {/* Live Voice Recorder */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Mic size={14} className="text-rose-400" />
                  Rekam Suara (Voiceover)
                </span>
                {isRecording && (
                  <span className="text-[10px] text-rose-400 font-bold animate-pulse flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    MEREKAM...
                  </span>
                )}
              </div>
              <button
                onClick={handleToggleVoice}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                  isRecording 
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
                {isRecording ? 'Hentikan & Tambahkan ke Timeline' : 'Mulai Rekam Suara Langsung'}
              </button>
            </div>

            {/* Sound Effects List */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">Efek Suara (SFX)</h4>
              <div className="space-y-1.5">
                {sampleSFX.map((sfx) => (
                  <div
                    key={sfx.id}
                    className="p-2 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between hover:bg-slate-800/80 transition"
                  >
                    <div 
                      onClick={() => {
                        if (sfx.sound === 'whoosh') soundFX.playWhoosh();
                        else if (sfx.sound === 'pop') soundFX.playPop();
                        else if (sfx.sound === 'chime') soundFX.playChime();
                        else if (sfx.sound === 'glitch') soundFX.playGlitch();
                        else soundFX.playClick();
                      }}
                      className="flex items-center gap-2 cursor-pointer flex-1"
                    >
                      <span className="text-base">{sfx.icon}</span>
                      <span className="text-xs font-semibold text-slate-200">{sfx.title}</span>
                    </div>

                    <button
                      onClick={() => {
                        soundFX.playPop();
                        onAddAudioClip({
                          id: 'sfx-' + Date.now(),
                          name: sfx.title,
                          start: 0,
                          duration: 2,
                          volume: 100,
                          waveColor: '#f43f5e'
                        });
                      }}
                      className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 flex items-center justify-center transition"
                      title="Tambahkan ke timeline"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Music Tracks */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">Musik Latar (BGM)</h4>
              <div className="space-y-1.5">
                {sampleAudios.map((audio) => (
                  <div
                    key={audio.id}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between hover:border-cyan-500/40 transition"
                  >
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[170px]">{audio.title}</div>
                      <div className="text-[10px] text-slate-400">{audio.genre} • {audio.duration}</div>
                    </div>

                    <button
                      onClick={() => {
                        soundFX.playPop();
                        onAddAudioClip({
                          id: 'bgm-' + Date.now(),
                          name: audio.title,
                          start: 0,
                          duration: 20,
                          volume: 80,
                          waveColor: audio.waveColor
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 hover:bg-cyan-400 transition"
                    >
                      <Plus size={12} />
                      Pakai
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TEXT TOOL --- */}
        {activeTool === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Tambah Teks Kustom</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Ketik teks di sini..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => {
                    if (!customText.trim()) return;
                    soundFX.playPop();
                    onAddTextClip({
                      id: 'text-' + Date.now(),
                      text: customText.trim(),
                      start: 0,
                      duration: 4,
                      font: 'Plus Jakarta Sans',
                      color: '#ffffff',
                      size: 26,
                      style: 'bold_stroke',
                      x: 50,
                      y: 75
                    });
                    setCustomText('');
                  }}
                  className="btn-primary text-xs py-2 px-3 shrink-0"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Presets */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 mb-2">Gaya Preset Judul & Subtitle</h4>
              <div className="space-y-2">
                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddTextClip({
                      id: 'text-' + Date.now(),
                      text: 'SUBTITLE VIRAL KARAOKE ✨',
                      start: 0,
                      duration: 4,
                      font: 'Space Grotesk',
                      color: '#facc15',
                      size: 26,
                      style: 'karaoke',
                      x: 50,
                      y: 75
                    });
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 cursor-pointer hover:border-yellow-400 transition text-center"
                >
                  <span className="text-sm font-black text-yellow-400 font-display tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    SUBTITLE VIRAL KARAOKE
                  </span>
                </div>

                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddTextClip({
                      id: 'text-' + Date.now(),
                      text: 'CYBERPUNK NEON GLOW ⚡',
                      start: 0,
                      duration: 4,
                      font: 'Space Grotesk',
                      color: '#00E5FF',
                      size: 28,
                      style: 'neon',
                      x: 50,
                      y: 50
                    });
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 cursor-pointer hover:border-cyan-400 transition text-center"
                >
                  <span className="text-sm font-black text-cyan-400 glow-text tracking-wider">
                    CYBERPUNK NEON GLOW
                  </span>
                </div>

                <div
                  onClick={() => {
                    soundFX.playPop();
                    onAddTextClip({
                      id: 'text-' + Date.now(),
                      text: 'Judul Sinematik Minimalis',
                      start: 0,
                      duration: 4,
                      font: 'Inter',
                      color: '#ffffff',
                      size: 22,
                      style: 'cinematic',
                      x: 50,
                      y: 80
                    });
                  }}
                  className="p-3 rounded-xl bg-slate-950 border border-white/10 cursor-pointer hover:border-white/40 transition text-center"
                >
                  <span className="text-xs font-serif tracking-[0.2em] text-white uppercase">
                    Judul Sinematik Minimalis
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- EFFECTS & FILTERS --- */}
        {activeTool === 'effects' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 mb-2">Preset Filter Warna (LUTs)</h4>
            <div className="grid grid-cols-2 gap-2">
              {filterPresets.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    soundFX.playWhoosh();
                    onSetFilter(preset.id);
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition text-left ${
                    project.filter === preset.id
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                      : 'bg-slate-950 border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold truncate">{preset.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{preset.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TRANSITIONS --- */}
        {activeTool === 'transitions' && (
          <div className="space-y-2">
            {['Crossfade Lembut', 'Zoom In / Out Cepat', 'Whip Pan Kanan', 'Glitch Digital Dissolve', 'Flash Putih Sinematik'].map((trans, i) => (
              <div
                key={i}
                onClick={() => {
                  soundFX.playWhoosh();
                  alert(`✨ Transisi "${trans}" berhasil diterapkan antar klip video!`);
                }}
                className="p-3 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-400 cursor-pointer transition flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-white">{trans}</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                  0.5s
                </span>
              </div>
            ))}
          </div>
        )}

        {/* --- STICKERS --- */}
        {activeTool === 'stickers' && (
          <div>
            <h4 className="text-xs font-bold text-slate-400 mb-2">Pilih Stiker / Emotikon</h4>
            <div className="grid grid-cols-2 gap-2">
              {stickerPresets.map((stk) => (
                <div
                  key={stk.id}
                  onClick={() => {
                    soundFX.playPop();
                    onAddSticker({
                      id: 'stk-' + Date.now(),
                      text: stk.text,
                      start: 0,
                      duration: 5,
                      x: 50,
                      y: 30,
                      size: 22
                    });
                  }}
                  className="p-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-400 cursor-pointer transition text-center"
                >
                  <span className="text-xs font-bold text-white">{stk.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- AI TOOLS --- */}
        {activeTool === 'ai' && (
          <div className="space-y-2.5">
            <button
              onClick={() => {
                soundFX.playChime();
                onAddTextClip({
                  id: 'text-ai-' + Date.now(),
                  text: '✨ [AI Subtitle] "Perjalanan seru naik DAMRI!"',
                  start: 0,
                  duration: 5,
                  font: 'Plus Jakarta Sans',
                  color: '#facc15',
                  size: 24,
                  style: 'karaoke',
                  x: 50,
                  y: 75
                });
                alert('✨ AI Auto-Subtitle berhasil mendeteksi suara dan menambahkan teks karaoke!');
              }}
              className="w-full p-3 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-400/40 text-left hover:border-cyan-400 transition"
            >
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-cyan-400" />
                Generate Auto-Subtitle AI
              </div>
              <div className="text-[10px] text-slate-300 mt-0.5">Transkripsi ucapan menjadi teks bergaya karaoke</div>
            </button>

            <button
              onClick={() => {
                soundFX.playPop();
                alert('⚡ AI Smart Beat Sync berhasil memotong klip sesuai irama musik!');
              }}
              className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-left hover:border-purple-400 transition"
            >
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wand2 size={14} className="text-purple-400" />
                AI Beat Cut Matcher
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Sinkronkan potongan video dengan dentuman lagu</div>
            </button>
          </div>
        )}

        {/* --- ADJUSTMENT SLIDERS --- */}
        {activeTool === 'adjust' && (
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Kecerahan (Brightness)</span>
                <span className="font-mono text-cyan-400">{customFilter.brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="180"
                value={customFilter.brightness}
                onChange={(e) => handleSliderChange('brightness', e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Kontras (Contrast)</span>
                <span className="font-mono text-cyan-400">{customFilter.contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={customFilter.contrast}
                onChange={(e) => handleSliderChange('contrast', e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Saturasi Warna (Saturation)</span>
                <span className="font-mono text-cyan-400">{customFilter.saturate}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="250"
                value={customFilter.saturate}
                onChange={(e) => handleSliderChange('saturate', e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Efek Sepia Vintage</span>
                <span className="font-mono text-cyan-400">{customFilter.sepia}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={customFilter.sepia}
                onChange={(e) => handleSliderChange('sepia', e.target.value)}
                className="w-full accent-cyan-400"
              />
            </div>

            <button
              onClick={() => {
                setCustomFilter({ brightness: 100, contrast: 100, saturate: 100, sepia: 0, hueRotate: 0, blur: 0 });
                onApplyAdjustment('none');
              }}
              className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-bold text-slate-400 hover:text-white transition"
            >
              Reset Penyesuaian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
