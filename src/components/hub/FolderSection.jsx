import React from 'react';
import { Folder, Layers, Download, Plus, Sparkles, FolderOpen } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function FolderSection({ 
  folders, 
  selectedFolder, 
  onSelectFolder, 
  onOpenNewFolderModal 
}) {
  return (
    <section className="px-5 pt-4 pb-2">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
          Folder
          <span className="text-xs font-semibold text-slate-400">({folders.length})</span>
        </h2>

        <button
          onClick={() => { soundFX.playPop(); onOpenNewFolderModal(); }}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline transition"
        >
          <Plus size={14} />
          Tambah Folder
        </button>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {folders.map((folder) => {
          const isSelected = selectedFolder === folder.name;
          return (
            <div
              key={folder.id}
              onClick={() => {
                soundFX.playClick();
                onSelectFolder(isSelected ? 'Semua' : folder.name);
              }}
              className={`p-3.5 rounded-2xl cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-200 relative group border ${
                isSelected
                  ? 'bg-cyan-500/15 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/70 hover:bg-slate-800/80 border-white/5 hover:border-white/15'
              }`}
            >
              {/* Folder Icon with 3D aesthetic sky blue look matching screenshot */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform mb-2 relative">
                {folder.id === 'bawaan' ? (
                  <div className="flex flex-col items-center justify-center">
                    <Layers size={26} className="text-white drop-shadow" />
                  </div>
                ) : folder.id === 'impor' ? (
                  <Download size={26} className="text-white drop-shadow" />
                ) : (
                  <FolderOpen size={26} className="text-white drop-shadow" />
                )}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-slate-950" />
                )}
              </div>

              <span className={`text-sm font-bold truncate max-w-full ${
                isSelected ? 'text-cyan-300' : 'text-slate-100 group-hover:text-white'
              }`}>
                {folder.name}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {folder.count} proyek
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
