import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  Type, 
  Mic, 
  Scissors, 
  Layers, 
  Video, 
  FileText, 
  Bot, 
  Check, 
  ArrowRight,
  Upload
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function AiToolsTab({ onStartAiWorkflow }) {
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);

  const aiTools = [
    {
      id: 'auto_subtitle',
      title: 'AI Auto-Subtitle & Caption',
      desc: 'Buat teks subtitle otomatis dalam Bahasa Indonesia dengan animasi karaoke bergaya CapCut.',
      icon: Type,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Paling Populer'
    },
    {
      id: 'bg_remove',
      title: 'Hapus Latar Belakang (Smart Cutout)',
      desc: 'Hapus latar belakang video secara presisi tanpa memerlukan kain Green Screen.',
      icon: Scissors,
      color: 'from-purple-500 to-indigo-600',
      badge: 'AI Vision'
    },
    {
      id: 'tts_voice',
      title: 'Text-to-Speech Voiceover AI',
      desc: 'Ubah naskah teks menjadi suara narator vlog dan podcast Indonesia yang natural.',
      icon: Mic,
      color: 'from-amber-500 to-orange-600',
      badge: 'Natural Audio'
    },
    {
      id: 'beat_sync',
      title: 'Auto Beat Sync Musik',
      desc: 'Potong dan cocokkan transisi klip secara otomatis mengikuti ketukan beat audio.',
      icon: Zap,
      color: 'from-pink-500 to-rose-600',
      badge: '1-Klik Edit'
    }
  ];

  const handleRunAI = () => {
    soundFX.playPop();
    setIsProcessing(true);
    setResultMessage(null);
    setTimeout(() => {
      setIsProcessing(false);
      soundFX.playChime();
      setResultMessage('🎉 Berhasil diproses dengan AI! Proyek baru telah siap diedit.');
      setTimeout(() => {
        onStartAiWorkflow(selectedTool);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="px-5 pt-3 pb-24 text-left">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Bot className="text-cyan-400" size={22} />
          Fitur Cerdas AI Studio
        </h2>
        <p className="text-xs text-slate-400">Tingkatkan efisiensi editing dengan kecerdasan buatan terintegrasi</p>
      </div>

      {/* AI Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          return (
            <div
              key={tool.id}
              onClick={() => {
                soundFX.playClick();
                setSelectedTool(tool.id);
                setResultMessage(null);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/10 hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${tool.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                    {tool.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{tool.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{tool.desc}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className={isSelected ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                  {isSelected ? '✓ Terpilih' : 'Pilih Alat'}
                </span>
                <ArrowRight size={14} className={isSelected ? 'text-cyan-400 translate-x-1 transition-transform' : 'text-slate-500'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive AI Action Area */}
      {selectedTool && (
        <div className="p-5 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl animate-fadeIn">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-cyan-400" />
            Parameter AI ({aiTools.find(t => t.id === selectedTool)?.title})
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Teks Instruksi / Naskah Transkripsi:
              </label>
              <textarea
                rows={2}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Masukkan naskah atau biarkan AI mendeteksi audio secara otomatis..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Akurasi Model: <strong>v3.7 Ultra Neural</strong></span>
              <button
                onClick={handleRunAI}
                disabled={isProcessing}
                className="btn-primary text-xs py-2 px-4 flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sedang Memproses AI...
                  </>
                ) : (
                  <>
                    <Zap size={14} />
                    Eksekusi AI & Buka Editor
                  </>
                )}
              </button>
            </div>

            {resultMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Check size={16} />
                {resultMessage}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
