import React from 'react';
import { Camera, ChevronLeft, ChevronRight, Heart, Maximize2 } from 'lucide-react';
import { Photo } from '../types';

interface FilmstripViewProps {
  photos: Photo[];
  activePhotoId: string;
  onSelectPhoto: (photo: Photo) => void;
  onOpenLightbox: (photo: Photo) => void;
  onToggleLike: (photoId: string, e: React.MouseEvent) => void;
  likedIds: Set<string>;
}

export const FilmstripView: React.FC<FilmstripViewProps> = ({
  photos,
  activePhotoId,
  onSelectPhoto,
  onOpenLightbox,
  onToggleLike,
  likedIds,
}) => {
  if (photos.length === 0) return null;

  const activeIndex = Math.max(
    0,
    photos.findIndex((p) => p.id === activePhotoId)
  );
  const activePhoto = photos[activeIndex] || photos[0];
  const isLiked = likedIds.has(activePhoto.id);

  const handlePrev = () => {
    if (activeIndex > 0) {
      onSelectPhoto(photos[activeIndex - 1]);
    }
  };

  const handleNext = () => {
    if (activeIndex < photos.length - 1) {
      onSelectPhoto(photos[activeIndex + 1]);
    }
  };

  return (
    <div id="filmstrip-view-container" className="space-y-6">
      {/* Featured Big Stage */}
      <div className="relative w-full bg-stone-900 rounded-3xl overflow-hidden shadow-xl border border-stone-800 text-white min-h-[460px] flex flex-col md:flex-row">
        {/* Stage Image */}
        <div className="relative flex-1 flex items-center justify-center p-6 bg-black/40 min-h-[340px]">
          <img
            id="filmstrip-featured-image"
            src={activePhoto.url}
            alt={activePhoto.title}
            referrerPolicy="no-referrer"
            className="max-h-[460px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
          />

          {/* Floating Navigation Controls */}
          {activeIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 border border-white/10 text-white backdrop-blur-md transition"
              title="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {activeIndex < photos.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 border border-white/10 text-white backdrop-blur-md transition"
              title="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stage Side Info */}
        <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-stone-900/90 border-t md:border-t-0 md:border-l border-stone-800 shrink-0">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {activePhoto.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                {activeIndex + 1} / {photos.length}
              </span>
            </div>

            <h2 className="text-xl font-bold font-display text-white tracking-tight leading-snug">
              {activePhoto.title}
            </h2>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed line-clamp-3">
              {activePhoto.description}
            </p>

            {/* Author info */}
            <div className="mt-4 pt-4 border-t border-stone-800">
              <p className="text-xs font-semibold text-stone-200">
                {activePhoto.author}
              </p>
              <p className="text-[11px] text-stone-500">{activePhoto.authorHandle}</p>
            </div>

            {/* Camera specs */}
            <div className="mt-4 p-3 bg-stone-800/60 rounded-xl border border-stone-700/50 space-y-1.5 text-[11px] text-stone-300">
              <div className="flex items-center gap-1.5 font-medium text-stone-200">
                <Camera className="w-3.5 h-3.5 text-stone-400" />
                <span>{activePhoto.cameraInfo?.camera}</span>
              </div>
              <div className="text-stone-400 font-mono text-[10px]">
                {activePhoto.cameraInfo?.lens}
              </div>
              <div className="text-stone-400 font-mono text-[10px]">
                {activePhoto.cameraInfo?.aperture} • {activePhoto.cameraInfo?.shutterSpeed} • ISO {activePhoto.cameraInfo?.iso}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-4 mt-4 border-t border-stone-800">
            <button
              onClick={(e) => onToggleLike(activePhoto.id, e)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition ${
                isLiked
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{activePhoto.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={() => onOpenLightbox(activePhoto)}
              className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Strip of Thumbnails */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Filmstrip Reel
          </span>
          <span className="text-xs text-stone-400">
            Scroll or click to preview
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 no-scrollbar">
          {photos.map((p, idx) => {
            const isSelected = p.id === activePhoto.id;
            return (
              <button
                key={p.id}
                id={`thumb-${p.id}`}
                onClick={() => onSelectPhoto(p)}
                className={`group relative shrink-0 w-28 sm:w-36 aspect-4/3 rounded-xl overflow-hidden transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-rose-500 scale-105 shadow-md ring-2 ring-rose-500/20'
                    : 'border-transparent opacity-65 hover:opacity-100 hover:scale-102'
                }`}
              >
                <img
                  src={p.url}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1.5 text-[9px] font-mono font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded">
                  #{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
