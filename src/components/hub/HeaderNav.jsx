import React from 'react';
import { 
  Scan, 
  MoreHorizontal, 
  Search, 
  FolderPlus, 
  Sparkles, 
  Zap, 
  FileText, 
  Crown,
  X,
  SlidersHorizontal,
  Layers,
  ArrowDownToLine,
  CheckCircle2
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function HeaderNav({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab, 
  storyHighlights,
  onOpenScanner,
  onOpenSettings,
  isMobileFrame
}) {
  return (
    <header className="w-full flex flex-col border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      {/* Mobile Android Status Bar (Only in Mobile view or top bar) */}
      {isMobileFrame && (
        <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-white text-sm">
            <span>13.24</span>
            <span className="bg-red-500/90 text-[10px] text-white px-1.5 py-0.2 rounded-full font-bold">▲</span>
            <span className="text-emerald-400">💬</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-300">5G</span>
            <span>📶</span>
            <span className="text-slate-300 text-[11px] font-bold">49%</span>
            <span>🔋</span>
          </div>
        </div>
      )}

      {/* Main Header with Title & Icons */}
      <div className="flex items-center justify-between px-5 pt-3 pb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          Proyek
          <span className="text-xs bg-cyan-500/20 text-cyan-400 font-semibold px-2 py-0.5 rounded-full border border-cyan-500/30">
            PRO
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => { soundFX.playClick(); onOpenScanner(); }}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition border border-white/10"
            title="Pindai Kode QR / Sambungkan Perangkat"
          >
            <Scan size={20} />
          </button>
          
          <button 
            onClick={() => { soundFX.playClick(); onOpenSettings(); }}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition border border-white/10"
            title="Menu & Opsi Tambahan"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 py-2">
        <div className="relative flex items-center w-full bg-slate-900/90 rounded-2xl border border-white/10 px-3.5 py-2.5 shadow-inner focus-within:border-cyan-500/70 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
          <Search size={18} className="text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Mencari proyek, template, atau aset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => { soundFX.playPop(); setSearchQuery(''); }}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Story / Media Highlights Carousel */}
      <div className="px-5 pt-2 pb-3 overflow-x-auto flex items-center gap-3.5 scrollbar-none no-scrollbar">
        {storyHighlights.map((story) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            onClick={() => soundFX.playWhoosh()}
          >
            <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 relative overflow-hidden group-hover:scale-105 transition-transform duration-200 shadow-md">
              <img 
                src={story.img} 
                alt={story.title} 
                className="w-full h-full object-cover rounded-[14px]"
              />
              {story.tag === 'Shopee' && (
                <div className="absolute bottom-0 right-0 bg-orange-500 text-[9px] text-white font-bold px-1 rounded-tl-md">
                  🛍️
                </div>
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-300 max-w-[58px] truncate text-center group-hover:text-cyan-400">
              {story.title}
            </span>
          </div>
        ))}
        
        {/* Shopee Tag Banner Item like in Screenshot */}
        <div className="shrink-0 flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-3 py-2 rounded-2xl cursor-pointer hover:bg-orange-500/20 transition">
          <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            🛍️
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-orange-400">Shopee Tag</div>
            <div className="text-[10px] text-slate-400">Aset Terhubung</div>
          </div>
        </div>
      </div>

      {/* Feature Sub-Tabs matching screenshot */}
      <div className="flex items-center px-4 gap-1 border-t border-white/5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => { soundFX.playClick(); setActiveTab('proyek'); }}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'proyek'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText size={16} className={activeTab === 'proyek' ? 'text-cyan-400' : ''} />
          Proyek
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('impor'); }}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'impor'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowDownToLine size={16} className={activeTab === 'impor' ? 'text-cyan-400' : ''} />
          Impor
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('template'); }}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'template'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles size={16} className={activeTab === 'template' ? 'text-cyan-400' : ''} />
          Template
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('ai_tools'); }}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'ai_tools'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap size={16} className={activeTab === 'ai_tools' ? 'text-amber-400' : ''} />
          Edit Cepat AI
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('vip'); }}
          className={`flex items-center gap-2 py-3 px-3.5 border-b-2 text-sm font-bold transition whitespace-nowrap ${
            activeTab === 'vip'
              ? 'border-cyan-400 text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crown size={16} className="text-amber-400" />
          VIP Cloud
        </button>
      </div>
    </header>
  );
}
