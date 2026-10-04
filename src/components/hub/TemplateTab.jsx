import React from 'react';
import { Sparkles, Play, Flame, Film, Download, ArrowRight } from 'lucide-react';
import { sampleTemplates } from '../../data/initialData';
import { soundFX } from '../../utils/audioEngine';

export default function TemplateTab({ onUseTemplate }) {
  return (
    <div className="px-5 pt-3 pb-24 text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="text-orange-500 fill-orange-500" size={20} />
            Template Video Trending
          </h2>
          <p className="text-xs text-slate-400">Gunakan template siap pakai dan gantikan dengan klip Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sampleTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="group bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition duration-200 flex flex-col shadow-lg"
          >
            <div className="relative aspect-video bg-slate-950 overflow-hidden">
              <img
                src={tpl.thumbnail}
                alt={tpl.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute top-2.5 left-2.5 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                <Flame size={12} />
                {tpl.tag}
              </div>

              <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                {tpl.duration}
              </div>

              <div className="absolute bottom-2.5 left-2.5 text-slate-300 text-xs font-semibold">
                🔥 {tpl.uses} Pengguna
              </div>
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                  {tpl.title}
                </h4>
                <span className="text-xs text-slate-400">Siap edit otomatis</span>
              </div>

              <button
                onClick={() => {
                  soundFX.playPop();
                  onUseTemplate(tpl);
                }}
                className="btn-primary text-xs py-2 px-3.5"
              >
                Gunakan
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
