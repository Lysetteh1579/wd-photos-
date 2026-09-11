import { Photo } from '../types';

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: 'photo-1',
    title: 'Minimalist Concrete Geometry',
    description: 'Clean lines, dramatic shadows, and brutalist geometric angles capturing morning sunlight.',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80',
    author: 'Elena Vance',
    authorHandle: '@elenavance',
    date: '2026-03-15',
    likes: 142,
    aspectRatio: 'landscape',
    dimensions: '4000 × 2667',
    tags: ['Brutalism', 'Shadows', 'Concrete', 'Minimal'],
    cameraInfo: {
      camera: 'Sony A7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/5.6',
      shutterSpeed: '1/320s',
      iso: '100',
      focalLength: '35mm'
    }
  },
  {
    id: 'photo-2',
    title: 'Misty Alpine Ridge at Dawn',
    description: 'Dense fog weaves through pine tree ridges as dawn breaks over the northern mountain pass.',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    author: 'Julian Thorne',
    authorHandle: '@jthorne_landscapes',
    date: '2026-02-28',
    likes: 289,
    aspectRatio: 'landscape',
    dimensions: '5120 × 2880',
    tags: ['Mountains', 'Fog', 'Sunrise', 'Wilderness'],
    cameraInfo: {
      camera: 'Fujifilm GFX 100S',
      lens: 'GF 32-64mm f/4 R LM WR',
      aperture: 'f/8.0',
      shutterSpeed: '1/60s',
      iso: '160',
      focalLength: '45mm'
    }
  },
  {
    id: 'photo-3',
    title: 'Neon Reflection in Midnight Rain',
    description: 'A quiet metropolitan alleyway illuminated by ambient neon signs reflected on wet asphalt.',
    category: 'Urban',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    author: 'Kenji Sato',
    authorHandle: '@kenji_nocturne',
    date: '2026-03-01',
    likes: 215,
    aspectRatio: 'portrait',
    dimensions: '3000 × 4500',
    tags: ['Night', 'Neon', 'Rain', 'Metropolis'],
    cameraInfo: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      aperture: 'f/1.7',
      shutterSpeed: '1/125s',
      iso: '800',
      focalLength: '28mm'
    }
  },
  {
    id: 'photo-4',
    title: 'Terracotta Vessel & Botanical Stems',
    description: 'A study of texture, warm earthy ceramics, and dried eucalyptus foliage in diffused window light.',
    category: 'Studio',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1400&q=80',
    author: 'Clara Moreau',
    authorHandle: '@claramoreau_studio',
    date: '2026-03-04',
    likes: 98,
    aspectRatio: 'square',
    dimensions: '3600 × 3600',
    tags: ['Ceramics', 'Still Life', 'Warm Tones', 'Interior'],
    cameraInfo: {
      camera: 'Canon EOS R5',
      lens: 'RF 50mm f/1.2 L USM',
      aperture: 'f/2.0',
      shutterSpeed: '1/200s',
      iso: '100',
      focalLength: '50mm'
    }
  },
  {
    id: 'photo-5',
    title: 'Ocean Swell & Coastal Basalt',
    description: 'Crashing Pacific breakers foaming against rugged dark volcanic sea stacks.',
    category: 'Nature',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
    author: 'Julian Thorne',
    authorHandle: '@jthorne_landscapes',
    date: '2026-01-22',
    likes: 341,
    aspectRatio: 'landscape',
    dimensions: '4800 × 3200',
    tags: ['Ocean', 'Coast', 'Waves', 'Nature'],
    cameraInfo: {
      camera: 'Nikon Z8',
      lens: 'NIKKOR Z 24-120mm f/4 S',
      aperture: 'f/11',
      shutterSpeed: '1/250s',
      iso: '64',
      focalLength: '70mm'
    }
  },
  {
    id: 'photo-6',
    title: 'Monochrome Curved Stairwell',
    description: 'Spiral architectural stairs descending in high-contrast black and white tonality.',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
    author: 'Elena Vance',
    authorHandle: '@elenavance',
    date: '2026-02-14',
    likes: 178,
    aspectRatio: 'portrait',
    dimensions: '3200 × 4800',
    tags: ['Spiral', 'Black & White', 'Architecture', 'Stairs'],
    cameraInfo: {
      camera: 'Sony A7R V',
      lens: 'FE 16-35mm f/2.8 GM',
      aperture: 'f/4.0',
      shutterSpeed: '1/80s',
      iso: '400',
      focalLength: '20mm'
    }
  },
  {
    id: 'photo-7',
    title: 'Sunlit Portrait in Warm Amber',
    description: 'Candid golden hour natural light highlighting warm expression and delicate linen textures.',
    category: 'Portraits',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    author: 'Maya Lin',
    authorHandle: '@mayalin_portraits',
    date: '2026-03-08',
    likes: 412,
    aspectRatio: 'portrait',
    dimensions: '3500 × 5250',
    tags: ['Golden Hour', 'Portrait', 'Natural Light', 'Warmth'],
    cameraInfo: {
      camera: 'Canon EOS R6 Mark II',
      lens: 'RF 85mm f/1.2 L USM DS',
      aperture: 'f/1.4',
      shutterSpeed: '1/640s',
      iso: '100',
      focalLength: '85mm'
    }
  },
  {
    id: 'photo-8',
    title: 'Desert Dunes & Wind Ripples',
    description: 'Minimalist wind-sculpted sand ripples with low-angle shadow geometry at sunset.',
    category: 'Minimalist',
    url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=80',
    author: 'Julian Thorne',
    authorHandle: '@jthorne_landscapes',
    date: '2026-02-09',
    likes: 194,
    aspectRatio: 'wide',
    dimensions: '5600 × 2400',
    tags: ['Desert', 'Patterns', 'Sand', 'Minimal'],
    cameraInfo: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 16-55mm f/2.8 R LM WR',
      aperture: 'f/9.0',
      shutterSpeed: '1/160s',
      iso: '125',
      focalLength: '55mm'
    }
  },
  {
    id: 'photo-9',
    title: 'Glass Pavilion Reflection',
    description: 'Sleek modern glass pavilion mirroring the calm surface of an infinity reflecting pool.',
    category: 'Architecture',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    author: 'Elena Vance',
    authorHandle: '@elenavance',
    date: '2026-03-05',
    likes: 228,
    aspectRatio: 'landscape',
    dimensions: '4200 × 2800',
    tags: ['Glass', 'Reflection', 'Modernist', 'Symmetry'],
    cameraInfo: {
      camera: 'Sony A7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      aperture: 'f/6.3',
      shutterSpeed: '1/250s',
      iso: '100',
      focalLength: '24mm'
    }
  }
];

export const CATEGORIES = [
  'All',
  'Architecture',
  'Nature',
  'Urban',
  'Portraits',
  'Studio',
  'Minimalist'
];
