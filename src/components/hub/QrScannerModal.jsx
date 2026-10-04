import React, { useState, useEffect } from 'react';
import { X, Scan, Smartphone, Check, Sparkles, Wifi } from 'lucide-react';
import { soundFX } from '../../utils/audioEngine';

export default function QrScannerModal({ isOpen, onClose }) {
  const [isScanning, setIsScanning] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setIsConnected(false);
      const timer = setTimeout(() => {
        setIsScanning(false);
        setIsConnected(true);
        soundFX.playChime();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl text-center animate-fadeIn"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Scan size={20} className="text-cyan-400" />
            <h3 className="text-base font-bold text-white">Sinkronisasi Perangkat</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="my-6 flex flex-col items-center">
          <div className="relative w-48 h-48 bg-slate-950 rounded-2xl border-2 border-cyan-500/50 p-3 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Mock QR Code */}
            <div className="w-full h-full bg-white p-2 rounded-xl grid grid-cols-6 grid-rows-6 gap-1">
              {Array.from({ length: 36 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm ${
                    (i % 2 === 0 || i % 7 === 0 || i < 6 || i > 29) && i !== 14 && i !== 21 
                      ? 'bg-slate-950' 
                      : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Laser Scanning Line */}
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_#00e5ff] animate-bounce" />
            )}
          </div>

          <div className="mt-4">
            {isScanning ? (
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-cyan-400">
                <Wifi size={14} className="animate-pulse" />
                <span>Memindai kamera & mendeteksi ponsel...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
                <Check size={16} />
                <span>Ponsel Berhasil Tersinkronisasi!</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-2 px-2">
            Pindai kode QR ini dari aplikasi CapCut Mobile di smartphone Anda untuk transfer proyek instan.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary text-xs py-2.5"
        >
          {isConnected ? 'Selesai & Lanjutkan' : 'Tutup'}
        </button>
      </div>
    </div>
  );
}
