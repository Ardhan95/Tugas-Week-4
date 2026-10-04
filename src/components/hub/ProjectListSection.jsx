import React, { useState } from 'react';
import { 
  Folder, 
  MoreVertical, 
  Play, 
  CheckSquare, 
  Square, 
  LayoutGrid, 
  List, 
  Trash2, 
  Copy, 
  Edit3, 
  Download, 
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  Tag
} from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function ProjectListSection({
  projects,
  onOpenProject,
  onDeleteProject,
  onDuplicateProject,
  onRenameProject,
  onExportProject,
  selectedFolder
}) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'duration' | 'name'

  const toggleSelect = (id) => {
    soundFX.playPop();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    soundFX.playPop();
    if (selectedIds.length === projects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(projects.map(p => p.id));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Hapus ${selectedIds.length} proyek terpilih?`)) {
      soundFX.playGlitch();
      selectedIds.forEach(id => onDeleteProject(id));
      setSelectedIds([]);
      setIsSelectMode(false);
    }
  };

  // Sort projects
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'duration') return b.duration - a.duration;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0; // default newest
  });

  return (
    <section className="px-5 pt-3 pb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
            {selectedFolder === 'Semua' ? 'Semua' : selectedFolder}
            <span className="text-xs font-semibold text-slate-400">({projects.length})</span>
          </h2>
          {selectedFolder !== 'Semua' && (
            <span className="text-[11px] bg-sky-500/20 text-sky-300 font-semibold px-2 py-0.5 rounded-full border border-sky-500/30">
              Filter Aktif
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* Multi Select Toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setIsSelectMode(!isSelectMode);
              if (isSelectMode) setSelectedIds([]);
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
              isSelectMode
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
            }`}
            title="Mode Pilihan Banyak"
          >
            <CheckSquare size={17} />
          </button>

          {/* Grid / List view toggle */}
          <button
            onClick={() => {
              soundFX.playClick();
              setViewMode(viewMode === 'list' ? 'grid' : 'list');
            }}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 border border-white/5 transition"
            title="Ganti Tampilan Grid / List"
          >
            {viewMode === 'list' ? <LayoutGrid size={17} /> : <List size={17} />}
          </button>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {isSelectMode && (
        <div className="mb-4 p-3 bg-cyan-950/60 border border-cyan-500/30 rounded-2xl flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="text-cyan-400 font-bold hover:underline"
            >
              {selectedIds.length === projects.length ? 'Batalkan Semua' : 'Pilih Semua'}
            </button>
            <span className="text-slate-400">({selectedIds.length} dipilih)</span>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkDelete}
                className="bg-red-500/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-lg font-bold hover:bg-red-500/30 transition flex items-center gap-1"
              >
                <Trash2 size={13} />
                Hapus
              </button>
            </div>
          )}
        </div>
      )}

      {/* Section Subtitle matching screenshot "LEBIH TUA" */}
      <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mb-3">
        LEBIH TUA
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/40 border border-white/5">
          <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm font-semibold">Tidak ada proyek yang ditemukan</p>
          <p className="text-slate-500 text-xs mt-1">Buat proyek baru atau ubah kata kunci pencarian</p>
        </div>
      )}

      {/* Project Cards List Mode */}
      {viewMode === 'list' ? (
        <div className="flex flex-col gap-3">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl p-2.5 transition-all duration-200 border flex items-center gap-3.5 ${
                selectedIds.includes(project.id)
                  ? 'bg-cyan-500/10 border-cyan-500/50'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-white/5 hover:border-white/15'
              }`}
            >
              {/* Checkbox in select mode */}
              {isSelectMode && (
                <button
                  onClick={() => toggleSelect(project.id)}
                  className="p-1 text-cyan-400 shrink-0"
                >
                  {selectedIds.includes(project.id) ? (
                    <CheckSquare size={20} className="fill-cyan-400 text-slate-950" />
                  ) : (
                    <Square size={20} className="text-slate-500" />
                  )}
                </button>
              )}

              {/* Thumbnail with Duration Badge */}
              <div
                onClick={() => {
                  soundFX.playWhoosh();
                  onOpenProject(project);
                }}
                className="w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden relative shrink-0 cursor-pointer bg-slate-950 border border-white/10 group-hover:border-cyan-500/50 transition shadow-md"
              >
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Play hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/90 flex items-center justify-center text-slate-950 shadow-md">
                    <Play size={14} className="fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge matching screenshot */}
                <div className="absolute bottom-1 left-1 bg-black/75 backdrop-blur-sm text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded-md border border-white/10">
                  {project.formattedDuration}
                </div>
              </div>

              {/* Project Info */}
              <div 
                onClick={() => {
                  soundFX.playWhoosh();
                  onOpenProject(project);
                }}
                className="flex-1 min-w-0 cursor-pointer text-left"
              >
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-2.5 mt-1.5 text-xs text-slate-400">
                  {/* Folder Badge */}
                  <span className="inline-flex items-center gap-1 bg-sky-500/15 text-sky-400 font-semibold px-2 py-0.5 rounded-md border border-sky-500/20">
                    <Folder size={11} className="fill-sky-400" />
                    {project.folder}
                  </span>

                  {/* Date */}
                  <span className="text-[11px] text-slate-400 font-medium">
                    {project.date}
                  </span>

                  {/* Aspect ratio / FPS badge */}
                  <span className="hidden sm:inline text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                    {project.aspectRatio} • {project.fps}fps
                  </span>
                </div>
              </div>

              {/* Project Quick Action Menu */}
              <div className="relative shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundFX.playClick();
                    setActiveMenuId(activeMenuId === project.id ? null : project.id);
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
                >
                  <MoreVertical size={16} />
                </button>

                {/* Dropdown Menu */}
                {activeMenuId === project.id && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-9 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-1.5 z-50 animate-fadeIn"
                  >
                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        soundFX.playWhoosh();
                        onOpenProject(project);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/15 rounded-xl flex items-center gap-2 transition"
                    >
                      <ExternalLink size={14} />
                      Buka di Studio Editor
                    </button>

                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        const newName = prompt('Ubah nama proyek:', project.title);
                        if (newName && newName.trim()) {
                          onRenameProject(project.id, newName.trim());
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl flex items-center gap-2 transition"
                    >
                      <Edit3 size={14} />
                      Ganti Nama
                    </button>

                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        soundFX.playPop();
                        onDuplicateProject(project);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl flex items-center gap-2 transition"
                    >
                      <Copy size={14} />
                      Duplikat Proyek
                    </button>

                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        onExportProject(project);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl flex items-center gap-2 transition"
                    >
                      <Download size={14} />
                      Ekspor Cepat (MP4)
                    </button>

                    <div className="my-1 border-t border-white/10" />

                    <button
                      onClick={() => {
                        setActiveMenuId(null);
                        if (window.confirm(`Hapus proyek "${project.title}"?`)) {
                          soundFX.playGlitch();
                          onDeleteProject(project.id);
                        }
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/15 rounded-xl flex items-center gap-2 transition"
                    >
                      <Trash2 size={14} />
                      Hapus Proyek
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid Mode */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {sortedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundFX.playWhoosh();
                onOpenProject(project);
              }}
              className="group bg-slate-900/80 hover:bg-slate-800/90 border border-white/5 hover:border-cyan-500/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 p-2.5 flex flex-col shadow-md"
            >
              <div className="w-full aspect-video rounded-xl overflow-hidden relative bg-slate-950 border border-white/10 mb-2">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-black/75 text-[10px] font-mono font-bold text-white px-1.5 py-0.5 rounded-md">
                  {project.formattedDuration}
                </div>
              </div>

              <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 line-clamp-2 mb-1 text-left">
                {project.title}
              </h3>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-auto pt-1">
                <span className="text-sky-400 font-semibold">{project.folder}</span>
                <span>{project.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
