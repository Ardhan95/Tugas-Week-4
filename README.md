# 🎬 CapCut Studio Pro - Web Video Editor & Project Hub

A modern, high-performance, in-browser **Video Editing Suite & Project Manager** built with **React 19**, **Vite**, and **Vanilla CSS**. Features a non-linear multi-track timeline, real-time video canvas player, cinematic color grading LUTs, Web Audio sound effects, voiceover recording, and multi-format video export.

![CapCut Studio Pro Preview](public/assets/damri_bus.jpg)

---

## ✨ Fitur Utama (Key Features)

### 1. 📱 Project Hub & Dashboard
- **Mockup UI Mobile & Desktop Switcher**: Beralih antara tampilan frame smartphone (Samsung Android) dan layar penuh desktop pro studio.
- **Header & Pencarian Cepat**: Filter proyek secara real-time berdasarkan judul, tag, atau folder.
- **Top Media Stories Carousel**: Slider cerita/media terhubung dengan tag e-commerce (*Shopee*).
- **Manajemen Folder Interaktif**: Buat folder kustom dengan pilihan warna (*Bawaan*, *Impor*, *Travel Vlog*, *TikTok Shorts*).
- **Daftar Proyek Kaya**: Dilengkapi badge durasi, tanggal, folder, rasio aspek, fps, dan menu aksi (*Buka di Studio*, *Ganti Nama*, *Duplikat*, *Hapus*).
- **Floating Action Button (FAB)**: Tombol `+` bercahaya untuk membuat proyek baru dengan pemilih aspek rasio (16:9, 9:16, 1:1, 4:5, 21:9).

### 2. ✂️ Studio Video Editor Non-Linear
- **Real-Time Video Canvas Player**: Preview canvas interaktif dengan rendering overlay teks, stiker, dan timecode akurat (`00:00:00:00`).
- **Multi-Track Timeline**:
  - 🎬 **Video Track**: Thumbnail per frame, pemotongan klip (*Split* ✂️), duplikasi, hapus, dan pengatur kecepatan (*Speed Ramp* 0.5x - 4x).
  - 🎵 **Audio & SFX Track**: Visualisasi *waveform* audio, slider volume, efek suara (*Whoosh*, *Pop*, *Chime*, *Glitch*), dan perekaman suara mikrofon langsung (*Voiceover*).
  - ✍️ **Text & Subtitle Track**: Gaya preset karaoke kuning, font *Space Grotesk*, dan *Neon Glow*.
  - 🎭 **Stickers Track**: Emoji trending, badge viral, dan pin lokasi.
- **Filter & Color Grading Sinematik**:
  - *Teal & Orange Sinema*
  - *Cyberpunk Neon Glow*
  - *Retro VHS 90s*
  - *Golden Hour Sunset*
  - *Monokrom Noir*
  - *Ultra HDR & Vivid Pop*
  - Sliders penyesuaian kustom (Kecerahan, Kontras, Saturasi, Sepia).
- **Inspektur Properti**: Panel inspeksi untuk mengubah skala, warna teks, posisi vertikal, dan durasi elemen secara real-time.
- **Export & Render Engine**:
  - Pilihan resolusi: **720p HD**, **1080p Full HD**, **4K Ultra HD**.
  - Pilihan frame rate: **24 FPS**, **30 FPS**, **60 FPS**.
  - Format ekspor: **MP4**, **WebM**, **GIF**.
  - Simulasi rendering dengan persentase real-time, frame count, efek konfeti, dan pengunduhan instan.

---

## 🛠️ Teknologi & Arsitektur (Tech Stack)

| Komponen | Teknologi |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | Vanilla CSS (Glassmorphism, CSS Custom Properties, Dark Mode) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Audio Engine** | Web Audio API (Synthesized SFX & MediaRecorder Voice) |
| **Effects** | Canvas Confetti & Real-Time CSS/Canvas Filters |
| **Storage** | LocalStorage Persistence |

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 ke atas
- NPM atau PNPM

### Instalasi & Menjalankan

1. **Clone repository:**
   ```bash
   git clone https://github.com/Ardhan95/Tugas-Week-4.git
   cd Tugas-Week-4
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:5173`.

4. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## 📁 Struktur Direktori

```text
├── public/
│   ├── assets/              # Aset gambar & thumbnail sampel
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── DeviceFrameWrapper.jsx   # Wrapper tampilan Mobile / Desktop
│   │   ├── hub/
│   │   │   ├── HeaderNav.jsx            # Header & search bar
│   │   │   ├── FolderSection.jsx        # Grid folder bawaan & kustom
│   │   │   ├── ProjectListSection.jsx   # List/grid proyek & menu aksi
│   │   │   ├── BottomNav.jsx            # Navigasi bawah & Samsung bar
│   │   │   ├── TemplateTab.jsx          # Tab template viral
│   │   │   ├── AiToolsTab.jsx           # Tab alat cerdas AI
│   │   │   ├── ProfileTab.jsx           # Profil & storage usage
│   │   │   ├── NewProjectModal.jsx      # Modal buat proyek baru
│   │   │   ├── NewFolderModal.jsx       # Modal tambah folder
│   │   │   ├── QrScannerModal.jsx       # Modal QR sync
│   │   │   └── VipModal.jsx             # Modal VIP membership
│   │   └── studio/
│   │       ├── StudioHeader.jsx         # Header editor & rasio aspek
│   │       ├── StudioSidebar.jsx        # Sidebar alat editor
│   │       ├── StudioPanel.jsx          # Panel aset media, audio, teks, filter
│   │       ├── VideoPlayerCanvas.jsx    # Player canvas preview & kontrol
│   │       ├── TimelineEditor.jsx       # Multi-track timeline & split tool
│   │       ├── ClipInspector.jsx        # Inspektur properti klip
│   │       └── ExportModal.jsx          # Render & dialog download MP4
│   ├── data/
│   │   └── initialData.js               # Data sampel proyek & preset
│   ├── utils/
│   │   └── audioEngine.js               # Web Audio API engine
│   ├── App.jsx                          # Root Application Component
│   ├── index.css                        # Vanilla CSS design system
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 📜 Lisensi (License)

Dibuat untuk keperluan tugas dan eksplorasi web video editing. Bebas digunakan dan dikembangkan di bawah lisensi MIT.
