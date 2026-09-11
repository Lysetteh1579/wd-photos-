import React from 'react';
import { Camera, Search, Plus, LayoutGrid, Rows3, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { ViewMode, SortOption } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenUpload: () => void;
  totalPhotos: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onOpenUpload,
  totalPhotos,
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-30 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-stone-50 flex items-center justify-center shadow-sm">
              <Camera className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-stone-900 font-display">
                  WD Photos
                </h1>
                <span className="px-2 py-0.5 text-xs font-medium bg-stone-200/70 text-stone-700 rounded-full">
                  {totalPhotos} {totalPhotos === 1 ? 'Shot' : 'Shots'}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Visual gallery & curated photography collection
              </p>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                id="photo-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search photos, tags, gears..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-100/80 hover:bg-stone-100 focus:bg-white border border-transparent focus:border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-stone-800 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 p-0.5"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 bg-stone-100/80 border border-stone-200/60 rounded-xl px-2.5 py-1.5 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                id="photo-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                aria-label="Sort photos by"
                className="bg-transparent font-medium text-stone-700 focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Liked</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div id="view-mode-toggle" className="flex items-center bg-stone-100/80 border border-stone-200/60 rounded-xl p-0.5">
              <button
                id="btn-view-grid"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Uniform Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="btn-view-masonry"
                onClick={() => onViewModeChange('masonry')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'masonry'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Dynamic Masonry"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <button
                id="btn-view-filmstrip"
                onClick={() => onViewModeChange('filmstrip')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'filmstrip'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Filmstrip Stage"
              >
                <Rows3 className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Button */}
            <button
              id="btn-open-upload"
              onClick={onOpenUpload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Photo</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
