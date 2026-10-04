import React from 'react';
import { X, Crown, Check, Sparkles, Zap, ShieldCheck, Download, HardDrive } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../../utils/audioEngine';

export default function VipModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    soundFX.playChime();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert('🎉 Selamat! Akun Anda telah ditingkatkan ke CapCut VIP Pro Unlimited!');
    onClose();
  };

  const perks = [
    { title: 'Ekspor Resolusi 4K Ultra HD & 60 FPS', desc: 'Render tanpa kompresi dengan bitrate tinggi', icon: Download },
    { title: '1 TB Penyimpanan Cloud Anti-Hilang', desc: 'Sinkronisasi real-time antar perangkat HP dan Web', icon: HardDrive },
    { title: 'AI Auto-Subtitle & Voice Isolator', desc: 'Transkripsi otomatis multibahasa instan', icon: Zap },
    { title: '1,000+ Filter LUT Sinematik & Efek Pro', desc: 'Akses penuh ke seluruh template trending TikTok & Reels', icon: Sparkles },
    { title: 'Bebas Watermark & Iklan Selamanya', desc: 'Hasil video profesional siap unggah komersil', icon: ShieldCheck }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-fadeIn text-left"
      >
        {/* Glowing Background Accent */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/30">
              <Crown size={22} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-1.5">
                CapCut VIP PRO
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  PREMIUM
                </span>
              </h3>
              <p className="text-xs text-slate-400">Buka potensi editing tanpa batasan</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Perks list */}
        <div className="my-5 space-y-3">
          {perks.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-amber-400/30 transition">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{p.title}</h4>
                  <p className="text-[11px] text-slate-400">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing tag & CTA */}
        <div className="pt-2">
          <div className="text-center mb-3">
            <span className="text-2xl font-black text-amber-300">Rp 0</span>
            <span className="text-xs text-slate-400 line-through ml-2">Rp 129.000/bln</span>
            <span className="text-xs text-emerald-400 font-bold ml-1.5">(Gratis Uji Coba)</span>
          </div>

          <button
            onClick={handleUpgrade}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2"
          >
            <Crown size={18} className="fill-current" />
            Aktifkan Akses VIP Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}
