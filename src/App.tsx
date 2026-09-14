import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';

interface PhotoItem {
  id: number;
  title: string;
  category: string;
  image: string;
  alt: string;
}

const PHOTOS: PhotoItem[] = [
  {
    id: 1,
    title: 'Featured Photo',
    category: 'Featured',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaVumcaszpHP765DWjYSI-3epOvncD6UMyI4-M9pruMT2aeddU7kUsUQc&s=10',
    alt: 'Featured photo'
  },
  {
    id: 2,
    title: 'Tropical Ocean Shoreline',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    alt: 'Turquoise ocean waves gently breaking along a tropical beach shoreline'
  },
  {
    id: 3,
    title: 'Desert Sand Ripples',
    category: 'Minimal',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    alt: 'Rippled desert sand dunes sculptured by gentle wind under sunset'
  },
  {
    id: 4,
    title: 'Misty Pine Forest',
    category: 'Wilderness',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    alt: 'Tall evergreen pine forest shrouded in morning mist and sunlight'
  },
  {
    id: 5,
    title: 'Urban Architectural Lines',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    alt: 'Modern geometric glass skyscraper reflecting the sky'
  },
  {
    id: 6,
    title: 'Artisan Morning Coffee',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    alt: 'Artisan crafted latte coffee in ceramic cup with heart leaf latte art'
  },
  {
    id: 7,
    title: 'Alpine Valley Mist',
    category: 'Mountains',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    alt: 'Serene mountain lake reflection surrounded by evergreen slopes'
  },
  {
    id: 8,
    title: 'Wildflower Meadows',
    category: 'Botanical',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    alt: 'Lush wildflower meadow blooming with summer flowers in warm evening light'
  },
  {
    id: 9,
    title: 'Starry Night Horizon',
    category: 'Astronomy',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    alt: 'Vibrant starry night sky with Milky Way over dark mountain horizon'
  }
];

export function App() {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  return (
    <main
      id="photo-gallery-app"
      className="min-h-screen w-full bg-stone-50 text-stone-900 px-4 sm:px-6 lg:px-8 py-10"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header with Lysette Hernandez and DOB 11-17-2011 in light pink cursive */}
        <header className="text-center mb-8 sm:mb-10">
          <motion.h1
            id="user-name-cursive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-7xl font-normal text-pink-400 font-cursive leading-tight"
          >
            Lysette Hernandez
          </motion.h1>

          <motion.div
            id="user-dob-cursive"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-1 inline-block"
          >
            <span className="font-script text-2xl sm:text-3xl font-bold text-pink-400 tracking-wider">
              DOB 11-17-2011
            </span>
          </motion.div>
        </header>

        {/* 9 Photo Grid: 3 Rows, 3 Columns, Equal Dimensions */}
        <section
          id="photo-grid-container"
          aria-label="3x3 Photography Grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {PHOTOS.map((photo, index) => (
            <motion.article
              key={photo.id}
              id={`photo-card-${photo.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              onClick={() => setActivePhoto(photo)}
              className="group relative bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Equal Dimension Image Container: Square 1:1 Aspect Ratio */}
              <div className="relative w-full aspect-square overflow-hidden bg-stone-100">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Hover Action Overlay */}
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-stone-900 shadow-sm backdrop-blur-xs">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-stone-800 tracking-tight line-clamp-1">
                  {photo.title}
                </h2>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 shrink-0 ml-2">
                  #{photo.id}
                </span>
              </div>
            </motion.article>
          ))}
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            id="photo-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              id="photo-modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
            >
              {/* Close Button */}
              <button
                id="btn-close-modal"
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition backdrop-blur-xs"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative w-full aspect-square bg-stone-900">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Caption */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-rose-600 font-medium tracking-wide uppercase">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 font-display mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
