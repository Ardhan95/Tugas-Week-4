import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Sparkles, 
  Layers, 
  FolderPlus, 
  Video, 
  Upload, 
  Crown,
  Monitor
} from 'lucide-react';

import { initialProjects, initialFolders, storyHighlights } from './data/initialData';
import { soundFX } from './utils/audioEngine';

// Common
import DeviceFrameWrapper from './components/common/DeviceFrameWrapper';

// Hub Components
import HeaderNav from './components/hub/HeaderNav';
import FolderSection from './components/hub/FolderSection';
import ProjectListSection from './components/hub/ProjectListSection';
import BottomNav from './components/hub/BottomNav';
import TemplateTab from './components/hub/TemplateTab';
import AiToolsTab from './components/hub/AiToolsTab';
import ProfileTab from './components/hub/ProfileTab';

// Modals
import NewProjectModal from './components/hub/NewProjectModal';
import NewFolderModal from './components/hub/NewFolderModal';
import QrScannerModal from './components/hub/QrScannerModal';
import VipModal from './components/hub/VipModal';

// Studio Components
import StudioHeader from './components/studio/StudioHeader';
import StudioSidebar from './components/studio/StudioSidebar';
import StudioPanel from './components/studio/StudioPanel';
import VideoPlayerCanvas from './components/studio/VideoPlayerCanvas';
import TimelineEditor from './components/studio/TimelineEditor';
import ClipInspector from './components/studio/ClipInspector';
import ExportModal from './components/studio/ExportModal';

export default function App() {
  // App View State ('hub' or 'studio')
  const [currentView, setCurrentView] = useState('hub');
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Projects and Folders State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('capcut_projects_v1');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('capcut_folders_v1');
    return saved ? JSON.parse(saved) : initialFolders;
  });

  const [activeProject, setActiveProject] = useState(null);

  // Hub State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('Semua');
  const [activeTab, setActiveTab] = useState('proyek');
  const [activeNav, setActiveNav] = useState('edit');

  // Modals State
  const [isNewProjModalOpen, setIsNewProjModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Studio State
  const [activeStudioTool, setActiveStudioTool] = useState('media');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [customAdjustmentCss, setCustomAdjustmentCss] = useState('none');

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('capcut_projects_v1', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('capcut_folders_v1', JSON.stringify(folders));
  }, [folders]);

  // Video Playback Clock Loop
  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();

    const loop = (time) => {
      if (isPlaying && activeProject) {
        const delta = (time - lastTime) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= (activeProject.duration || 30)) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }
      lastTime = time;
      if (isPlaying) {
        animationFrame = requestAnimationFrame(loop);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, activeProject]);

  // Open Project in Studio
  const handleOpenProject = (project) => {
    setActiveProject(project);
    setCurrentTime(0);
    setIsPlaying(false);
    setSelectedItemId(project.clips?.[0]?.id || null);
    setCurrentView('studio');
  };

  // Back to Hub
  const handleBackToHub = () => {
    setIsPlaying(false);
    setCurrentView('hub');
  };

  // Delete Project
  const handleDeleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    if (activeProject && activeProject.id === id) {
      handleBackToHub();
    }
  };

  // Duplicate Project
  const handleDuplicateProject = (project) => {
    const dup = {
      ...project,
      id: 'proj-' + Date.now(),
      title: project.title + ' (Salinan)',
      date: 'Hari ini'
    };
    setProjects([dup, ...projects]);
  };

  // Rename Project
  const handleRenameProject = (id, newTitle) => {
    const updated = projects.map(p => p.id === id ? { ...p, title: newTitle } : p);
    setProjects(updated);
    if (activeProject && activeProject.id === id) {
      setActiveProject({ ...activeProject, title: newTitle });
    }
  };

  // Create New Project
  const handleCreateProject = (newProj) => {
    setProjects([newProj, ...projects]);
    handleOpenProject(newProj);
  };

  // Add Folder
  const handleAddFolder = (newFolder) => {
    setFolders([...folders, newFolder]);
  };

  // --- Studio Clip Operations ---
  const handleUpdateActiveProject = (updatedProj) => {
    setActiveProject(updatedProj);
    setProjects(projects.map(p => p.id === updatedProj.id ? updatedProj : p));
  };

  // Split Clip
  const handleSplitClip = () => {
    if (!activeProject || !selectedItemId) return;
    const clipIndex = activeProject.clips.findIndex(c => c.id === selectedItemId);
    if (clipIndex === -1) return;

    const clip = activeProject.clips[clipIndex];
    const splitOffset = currentTime - clip.start;
    if (splitOffset <= 0.5 || splitOffset >= clip.duration - 0.5) {
      alert('Posisikan playhead di bagian tengah klip untuk memotong (split).');
      return;
    }

    const firstHalf = {
      ...clip,
      duration: splitOffset
    };

    const secondHalf = {
      ...clip,
      id: 'c-' + Date.now(),
      name: clip.name + ' (Bagian 2)',
      start: clip.start + splitOffset,
      duration: clip.duration - splitOffset
    };

    const updatedClips = [...activeProject.clips];
    updatedClips.splice(clipIndex, 1, firstHalf, secondHalf);

    handleUpdateActiveProject({
      ...activeProject,
      clips: updatedClips
    });
    soundFX.playPop();
  };

  // Delete Selected Clip from timeline
  const handleDeleteSelectedClip = () => {
    if (!activeProject || !selectedItemId) return;

    const updatedClips = activeProject.clips.filter(c => c.id !== selectedItemId);
    const updatedAudio = activeProject.audioClips?.filter(a => a.id !== selectedItemId) || [];
    const updatedTexts = activeProject.textClips?.filter(t => t.id !== selectedItemId) || [];
    const updatedStickers = activeProject.stickers?.filter(s => s.id !== selectedItemId) || [];

    setSelectedItemId(null);
    handleUpdateActiveProject({
      ...activeProject,
      clips: updatedClips,
      audioClips: updatedAudio,
      textClips: updatedTexts,
      stickers: updatedStickers
    });
  };

  // Duplicate Selected Clip
  const handleDuplicateSelectedClip = () => {
    if (!activeProject || !selectedItemId) return;
    const clip = activeProject.clips.find(c => c.id === selectedItemId);
    if (!clip) return;

    const dupClip = {
      ...clip,
      id: 'c-' + Date.now(),
      name: clip.name + ' (Duplikat)',
      start: clip.start + clip.duration
    };

    handleUpdateActiveProject({
      ...activeProject,
      clips: [...activeProject.clips, dupClip]
    });
  };

  // Change Clip Speed
  const handleChangeSpeed = (speed) => {
    if (!activeProject || !selectedItemId) return;
    const updatedClips = activeProject.clips.map(c => 
      c.id === selectedItemId ? { ...c, speed: speed } : c
    );
    handleUpdateActiveProject({
      ...activeProject,
      clips: updatedClips
    });
  };

  // Update Individual Clip Properties from Inspector
  const handleUpdateClipProperties = (trackType, id, properties) => {
    if (!activeProject) return;
    let updatedProj = { ...activeProject };

    if (trackType === 'video') {
      updatedProj.clips = updatedProj.clips.map(c => c.id === id ? { ...c, ...properties } : c);
    } else if (trackType === 'audio') {
      updatedProj.audioClips = updatedProj.audioClips.map(a => a.id === id ? { ...a, ...properties } : a);
    } else if (trackType === 'text') {
      updatedProj.textClips = updatedProj.textClips.map(t => t.id === id ? { ...t, ...properties } : t);
    } else if (trackType === 'sticker') {
      updatedProj.stickers = updatedProj.stickers.map(s => s.id === id ? { ...s, ...properties } : s);
    }

    handleUpdateActiveProject(updatedProj);
  };

  // Filter projects by search and folder
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFolder = selectedFolder === 'Semua' || p.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <DeviceFrameWrapper
      isMobileFrame={isMobileFrame}
      onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
    >
      {/* ===================== VIEW 1: HUB / PROYEK DASHBOARD ===================== */}
      {currentView === 'hub' && (
        <div className="w-full flex-1 flex flex-col relative bg-slate-950 min-h-screen text-slate-100">
          {/* Header with Search & Tabs matching screenshot */}
          <HeaderNav
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            storyHighlights={storyHighlights}
            onOpenScanner={() => setIsQrModalOpen(true)}
            onOpenSettings={() => setIsVipModalOpen(true)}
            isMobileFrame={isMobileFrame}
          />

          {/* Body Content based on activeTab */}
          <main className="flex-1 overflow-y-auto">
            {activeTab === 'proyek' && (
              <>
                {/* Folders Section matching screenshot */}
                <FolderSection
                  folders={folders}
                  selectedFolder={selectedFolder}
                  onSelectFolder={setSelectedFolder}
                  onOpenNewFolderModal={() => setIsNewFolderModalOpen(true)}
                />

                {/* Projects List Section matching screenshot */}
                <ProjectListSection
                  projects={filteredProjects}
                  selectedFolder={selectedFolder}
                  onOpenProject={handleOpenProject}
                  onDeleteProject={handleDeleteProject}
                  onDuplicateProject={handleDuplicateProject}
                  onRenameProject={handleRenameProject}
                  onExportProject={(p) => {
                    setActiveProject(p);
                    setIsExportModalOpen(true);
                  }}
                />
              </>
            )}

            {activeTab === 'impor' && (
              <div className="p-6 text-center">
                <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900 border border-white/10 text-center">
                  <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white">Impor Aset Langsung</h3>
                  <p className="text-xs text-slate-400 my-2">Unggah video atau foto dari perangkat untuk memulai proyek baru secara instan.</p>
                  <button
                    onClick={() => setIsNewProjModalOpen(true)}
                    className="btn-primary text-xs py-2.5 px-4 mt-2"
                  >
                    Pilih File & Buat Proyek
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'template' && (
              <TemplateTab
                onUseTemplate={(tpl) => {
                  const newProj = {
                    id: 'proj-' + Date.now(),
                    title: tpl.title,
                    duration: 20,
                    formattedDuration: tpl.duration,
                    folder: 'Bawaan',
                    date: 'Hari ini',
                    thumbnail: tpl.thumbnail,
                    aspectRatio: '9:16',
                    fps: 60,
                    size: '22.5 MB',
                    tags: ['Template', tpl.tag],
                    clips: [
                      { id: 'c1', type: 'video', name: 'Klip Template', start: 0, duration: 20, speed: 1, volume: 100, thumbnail: tpl.thumbnail }
                    ],
                    audioClips: [
                      { id: 'a1', name: 'Musik Template Beat Sync', start: 0, duration: 20, volume: 80, waveColor: '#ec4899' }
                    ],
                    textClips: [
                      { id: 't1', text: tpl.title.toUpperCase(), start: 1, duration: 4, font: 'Space Grotesk', color: '#facc15', size: 26, style: 'bold_stroke', x: 50, y: 70 }
                    ],
                    stickers: []
                  };
                  handleCreateProject(newProj);
                }}
              />
            )}

            {activeTab === 'ai_tools' && (
              <AiToolsTab
                onStartAiWorkflow={(toolId) => {
                  const newProj = {
                    id: 'proj-ai-' + Date.now(),
                    title: 'Proyek AI ' + (toolId || 'Workflow'),
                    duration: 25,
                    formattedDuration: '0:25.00',
                    folder: 'Bawaan',
                    date: 'Hari ini',
                    thumbnail: '/assets/damri_bus.jpg',
                    aspectRatio: '16:9',
                    fps: 60,
                    size: '28.0 MB',
                    tags: ['AI Generated', 'Auto-Caption'],
                    clips: [
                      { id: 'c-ai', type: 'video', name: 'DAMRI AI Master', start: 0, duration: 25, speed: 1, volume: 90, thumbnail: '/assets/damri_bus.jpg' }
                    ],
                    audioClips: [
                      { id: 'a-ai', name: 'AI Enhanced Audio Track', start: 0, duration: 25, volume: 100, waveColor: '#10b981' }
                    ],
                    textClips: [
                      { id: 't-ai', text: '✨ [AI Subtitle Transcribed Automatically]', start: 1, duration: 6, font: 'Plus Jakarta Sans', color: '#00E5FF', size: 24, style: 'karaoke', x: 50, y: 75 }
                    ],
                    stickers: []
                  };
                  handleCreateProject(newProj);
                }}
              />
            )}

            {activeTab === 'vip' && (
              <div className="p-6">
                <ProfileTab onOpenVip={() => setIsVipModalOpen(true)} />
              </div>
            )}
          </main>

          {/* Floating Action Button (FAB) matching screenshot with glowing blue "+" */}
          <button
            onClick={() => {
              soundFX.playPop();
              setIsNewProjModalOpen(true);
            }}
            className="fab-button"
            title="Buat Proyek Baru"
          >
            <Plus size={32} strokeWidth={2.8} />
          </button>

          {/* Bottom Navigation matching screenshot */}
          <BottomNav
            activeNav={activeNav}
            setActiveNav={(nav) => {
              setActiveNav(nav);
              if (nav === 'edit') setActiveTab('proyek');
              else if (nav === 'template') setActiveTab('template');
              else if (nav === 'eksplor') setActiveTab('ai_tools');
              else if (nav === 'vip') setIsVipModalOpen(true);
              else if (nav === 'saya') setActiveTab('vip');
            }}
            isMobileFrame={isMobileFrame}
            onOpenNewProject={() => setIsNewProjModalOpen(true)}
          />
        </div>
      )}

      {/* ===================== VIEW 2: VIDEO EDITOR STUDIO PRO ===================== */}
      {currentView === 'studio' && activeProject && (
        <div className="w-full flex-1 flex flex-col bg-slate-950 text-slate-100 min-h-[750px] relative overflow-hidden">
          {/* Top Studio Bar */}
          <StudioHeader
            project={activeProject}
            onBackToHub={handleBackToHub}
            onUpdateProject={handleUpdateActiveProject}
            onOpenExport={() => setIsExportModalOpen(true)}
            isMobileFrame={isMobileFrame}
            onToggleFrameMode={() => setIsMobileFrame(!isMobileFrame)}
          />

          {/* Middle Workspace: Sidebar + Panel + Video Preview + Inspector */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left Sidebar Tools */}
            <StudioSidebar
              activeTool={activeStudioTool}
              onSelectTool={setActiveStudioTool}
            />

            {/* Slide-out Tool Content Panel */}
            <StudioPanel
              activeTool={activeStudioTool}
              onClose={() => setActiveStudioTool(null)}
              project={activeProject}
              onAddMediaClip={(clip) => {
                handleUpdateActiveProject({
                  ...activeProject,
                  clips: [...(activeProject.clips || []), clip]
                });
              }}
              onAddAudioClip={(audio) => {
                handleUpdateActiveProject({
                  ...activeProject,
                  audioClips: [...(activeProject.audioClips || []), audio]
                });
              }}
              onAddTextClip={(text) => {
                handleUpdateActiveProject({
                  ...activeProject,
                  textClips: [...(activeProject.textClips || []), text]
                });
              }}
              onAddSticker={(stk) => {
                handleUpdateActiveProject({
                  ...activeProject,
                  stickers: [...(activeProject.stickers || []), stk]
                });
              }}
              onSetFilter={(filterId) => {
                handleUpdateActiveProject({
                  ...activeProject,
                  filter: filterId
                });
              }}
              onApplyAdjustment={(css) => {
                setCustomAdjustmentCss(css);
              }}
            />

            {/* Center Video Player & Canvas */}
            <VideoPlayerCanvas
              project={activeProject}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              totalDuration={activeProject.duration || 30}
              customAdjustmentCss={customAdjustmentCss}
            />

            {/* Right Clip Inspector Panel */}
            {selectedItemId && (
              <ClipInspector
                selectedItemId={selectedItemId}
                project={activeProject}
                onUpdateClip={handleUpdateClipProperties}
                onDeleteClip={handleDeleteSelectedClip}
                onClose={() => setSelectedItemId(null)}
              />
            )}
          </div>

          {/* Bottom Multi-Track Timeline */}
          <TimelineEditor
            project={activeProject}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            totalDuration={activeProject.duration || 30}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            onSplitClip={handleSplitClip}
            onDeleteClip={handleDeleteSelectedClip}
            onDuplicateClip={handleDuplicateSelectedClip}
            onChangeSpeed={handleChangeSpeed}
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
          />
        </div>
      )}

      {/* ===================== GLOBAL MODALS ===================== */}
      <NewProjectModal
        isOpen={isNewProjModalOpen}
        onClose={() => setIsNewProjModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onAddFolder={handleAddFolder}
      />

      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      <VipModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
      />

      {activeProject && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          project={activeProject}
        />
      )}
    </DeviceFrameWrapper>
  );
}