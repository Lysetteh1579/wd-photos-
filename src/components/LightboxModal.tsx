import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Calendar,
  Tag,
  Maximize2,
  Minimize2,
  Trash2,
  ExternalLink,
  Info
} from 'lucide-react';
import { Photo } from '../types';

interface LightboxModalProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onToggleLike: (photoId: string) => void;
  isLiked: boolean;
  onDeletePhoto?: (photoId: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onToggleLike,
  isLiked,
  onDeletePhoto,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  // Keyboard navigation
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md transition-all"
    >
      {/* Top action bar */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/80 to-transparent text-white">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-white/15 text-stone-200 backdrop-blur-md">
            {photo.category}
          </span>
          <span className="text-sm font-medium text-stone-300 hidden sm:inline">
            By {photo.author}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom Toggle */}
          <button
            id="btn-lightbox-zoom"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition"
            title={isZoomed ? 'Reset zoom' : 'Zoom in'}
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Details Toggle */}
          <button
            id="btn-lightbox-details-toggle"
            onClick={() => setShowDetails(!showDetails)}
            className={`p-2 rounded-full transition ${
              showDetails ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20 text-stone-200'
            }`}
            title="Toggle details panel"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* External Link */}
          <a
            id="btn-lightbox-external"
            href={photo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 transition"
            title="Open raw image in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Delete Photo if custom */}
          {photo.isCustomUpload && onDeletePhoto && (
            <button
              id="btn-lightbox-delete"
              onClick={() => {
                if (window.confirm('Are you sure you want to remove this photo?')) {
                  onDeletePhoto(photo.id);
                  onClose();
                }
              }}
              className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition"
              title="Delete uploaded photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          {/* Close button */}
          <button
            id="btn-lightbox-close"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition ml-1"
            title="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Canvas & Side Panel Container */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-2 sm:p-6 md:p-12 overflow-hidden">
        
        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            id="btn-lightbox-prev"
            onClick={onPrev}
            className="absolute left-3 sm:left-6 z-20 p-2.5 sm:p-3 rounded-full bg-stone-900/70 hover:bg-stone-900 border border-white/10 text-white backdrop-blur-md transition shadow-lg"
            title="Previous photo (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            id="btn-lightbox-next"
            onClick={onNext}
            className="absolute right-3 sm:right-6 z-20 p-2.5 sm:p-3 rounded-full bg-stone-900/70 hover:bg-stone-900 border border-white/10 text-white backdrop-blur-md transition shadow-lg"
            title="Next photo (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Center Image Container */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-auto p-4">
          <img
            id="lightbox-main-image"
            src={photo.url}
            alt={photo.title}
            referrerPolicy="no-referrer"
            className={`max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300 select-none ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        {/* Side Details Panel */}
        {showDetails && (
          <div
            id="lightbox-details-panel"
            className="w-full md:w-80 max-h-[40vh] md:max-h-[85vh] overflow-y-auto bg-stone-900/90 border border-stone-800 rounded-2xl p-5 text-stone-200 backdrop-blur-xl shrink-0 space-y-4 shadow-xl text-left"
          >
            <div>
              <h2 className="text-lg font-bold text-white font-display tracking-tight">
                {photo.title}
              </h2>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {photo.description}
              </p>
            </div>

            {/* Author & Likes Bar */}
            <div className="flex items-center justify-between py-2 border-y border-stone-800">
              <div>
                <p className="text-xs font-semibold text-stone-200">{photo.author}</p>
                <p className="text-[11px] text-stone-500">{photo.authorHandle}</p>
              </div>

              <button
                id="btn-lightbox-like"
                onClick={() => onToggleLike(photo.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  isLiked
                    ? 'bg-rose-500 text-white'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{photo.likes + (isLiked ? 1 : 0)}</span>
              </button>
            </div>

            {/* Camera / EXIF Data */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Equipment & EXIF
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
                  <span className="text-[10px] text-stone-400 block">Camera</span>
                  <span className="font-medium text-stone-200 truncate block">
                    {photo.cameraInfo?.camera || 'Digital RAW'}
                  </span>
                </div>
                <div className="bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
                  <span className="text-[10px] text-stone-400 block">Lens</span>
                  <span className="font-medium text-stone-200 truncate block">
                    {photo.cameraInfo?.lens || 'Standard Prime'}
                  </span>
                </div>
                <div className="bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
                  <span className="text-[10px] text-stone-400 block">Aperture / Shutter</span>
                  <span className="font-mono text-stone-200 block">
                    {photo.cameraInfo?.aperture} • {photo.cameraInfo?.shutterSpeed}
                  </span>
                </div>
                <div className="bg-stone-800/60 p-2.5 rounded-xl border border-stone-700/50">
                  <span className="text-[10px] text-stone-400 block">ISO / Focal</span>
                  <span className="font-mono text-stone-200 block">
                    ISO {photo.cameraInfo?.iso} • {photo.cameraInfo?.focalLength}
                  </span>
                </div>
              </div>
            </div>

            {/* Metadata tags and date */}
            <div className="space-y-2 text-xs text-stone-400 pt-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>Published on {photo.date}</span>
              </div>
              <div className="text-[11px] text-stone-500">
                <span>Dimensions: {photo.dimensions}</span>
              </div>

              {/* Tags */}
              <div className="pt-2">
                <div className="flex items-center gap-1 text-[11px] text-stone-400 mb-1.5">
                  <Tag className="w-3 h-3" />
                  <span>Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-stone-800 text-[11px] text-stone-300 border border-stone-700/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
