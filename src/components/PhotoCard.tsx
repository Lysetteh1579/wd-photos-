import React, { useState } from 'react';
import { Heart, Maximize2, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { Photo } from '../types';

interface PhotoCardProps {
  photo: Photo;
  onSelect: (photo: Photo) => void;
  onToggleLike: (photoId: string, e: React.MouseEvent) => void;
  isLiked?: boolean;
  layoutMode: 'grid' | 'masonry';
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onSelect,
  onToggleLike,
  isLiked = false,
  layoutMode,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const getAspectClass = () => {
    if (layoutMode === 'grid') return 'aspect-4/3';
    switch (photo.aspectRatio) {
      case 'portrait':
        return 'aspect-3/4';
      case 'square':
        return 'aspect-square';
      case 'wide':
        return 'aspect-16/9';
      case 'landscape':
      default:
        return 'aspect-3/2';
    }
  };

  return (
    <motion.div
      id={`photo-card-${photo.id}`}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(photo)}
      className="group relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className={`relative w-full overflow-hidden ${getAspectClass()}`}>
        {/* Placeholder skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-stone-300" />
          </div>
        )}

        <img
          src={photo.url}
          alt={photo.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 bg-stone-900/70 backdrop-blur-md text-stone-100 text-[11px] font-medium rounded-full opacity-90 group-hover:opacity-100 transition">
            {photo.category}
          </span>
          <button
            id={`like-btn-${photo.id}`}
            onClick={(e) => onToggleLike(photo.id, e)}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition ${
              isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-stone-900/60 hover:bg-stone-900/80 text-stone-100'
            }`}
            title={isLiked ? 'Unlike photo' : 'Like photo'}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Details Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white pointer-events-none">
          <p className="text-xs font-light text-stone-300 mb-0.5">
            {photo.author}
          </p>
          <h3 className="text-sm font-semibold tracking-tight line-clamp-1">
            {photo.title}
          </h3>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/15 text-[11px] text-stone-300">
            <span className="flex items-center gap-1 font-mono">
              <Camera className="w-3 h-3 text-stone-400" />
              {photo.cameraInfo?.camera?.split(' ')[0] || 'Camera'} • {photo.cameraInfo?.focalLength}
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-stone-300" />
              <span>Details</span>
            </span>
          </div>
        </div>

      </div>

      {/* Visible Bottom Caption in Grid Mode when not hovered */}
      <div className="p-3 bg-white border-t border-stone-100 flex items-center justify-between sm:hidden">
        <div>
          <h4 className="text-xs font-semibold text-stone-800 line-clamp-1">
            {photo.title}
          </h4>
          <p className="text-[11px] text-stone-500">{photo.author}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
          <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
          <span>{photo.likes + (isLiked ? 1 : 0)}</span>
        </div>
      </div>
    </motion.div>
  );
};
