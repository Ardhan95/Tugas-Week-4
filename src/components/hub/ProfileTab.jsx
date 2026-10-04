import React from 'react';
import { User, HardDrive, Shield, Settings, Sparkles, Smartphone, Download, Award, ChevronRight, LogOut } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function ProfileTab({ onOpenVip }) {
  return (
    <div className="px-5 pt-3 pb-24 text-left">
      {/* Profile Header Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-white/10 shadow-xl mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-xl">
              ⚡ A
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Ardhan Creator</h3>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400">ardhan.editor@capcut.pro</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Tersambung ke Cloud Sync
            </div>
          </div>
        </div>

        <button
          onClick={() => { soundFX.playPop(); onOpenVip(); }}
          className="btn-primary text-xs py-2 px-3 shrink-0"
        >
          <Award size={14} />
          VIP Cloud
        </button>
      </div>

      {/* Cloud Storage Usage */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <HardDrive size={15} className="text-cyan-400" />
            Kapasitas Cloud Storage
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300">24.8 GB / 100 GB</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            style={{ width: '24.8%' }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          Penyimpanan otomatis untuk 8 proyek dan 42 aset video tanpa batas waktu.
        </p>
      </div>

      {/* Menu List */}
      <div className="space-y-2">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between hover:bg-slate-800/80 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400">
              <Download size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Riwayat Ekspor Video</h4>
              <p className="text-[10px] text-slate-400">14 video berhasil di-render</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between hover:bg-slate-800/80 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <Smartphone size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Perangkat Tersambung</h4>
              <p className="text-[10px] text-slate-400">Samsung Galaxy S24 Ultra & Web</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between hover:bg-slate-800/80 cursor-pointer transition">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
              <Settings size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Pengaturan Editor & Akselerasi GPU</h4>
              <p className="text-[10px] text-slate-400">Hardware Encoding: WebGL 2.0 Aktif</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
}
