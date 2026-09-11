export interface CameraInfo {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
  focalLength: string;
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  author: string;
  authorHandle: string;
  date: string;
  likes: number;
  isLiked?: boolean;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide';
  dimensions: string;
  tags: string[];
  cameraInfo: CameraInfo;
  isCustomUpload?: boolean;
}

export type ViewMode = 'masonry' | 'grid' | 'filmstrip';
export type SortOption = 'featured' | 'newest' | 'popular' | 'title';

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: SortOption;
  viewMode: ViewMode;
}
