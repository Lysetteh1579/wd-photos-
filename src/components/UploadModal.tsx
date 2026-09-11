import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';
import { Photo } from '../types';
import { CATEGORIES } from '../data/photos';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: Photo) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('Lysette Hernandez');
  const [authorHandle, setAuthorHandle] = useState('@lysette_h');
  const [camera, setCamera] = useState('Canon EOS R');
  const [lens, setLens] = useState('50mm f/1.8');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [useUrlMode, setUseUrlMode] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = useUrlMode ? imageUrlInput : imagePreview;
    if (!finalUrl) {
      alert('Please select or provide an image.');
      return;
    }

    const newPhoto: Photo = {
      id: `photo-user-${Date.now()}`,
      title: title.trim() || 'Untitled Shot',
      description: description.trim() || 'Uploaded photo for web design portfolio showcase.',
      category,
      url: finalUrl,
      author: author.trim() || 'Photographer',
      authorHandle: authorHandle.trim() || '@photographer',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      aspectRatio: 'landscape',
      dimensions: 'High Resolution',
      tags: [category, 'User Upload', 'Showcase'],
      cameraInfo: {
        camera: camera || 'Digital Camera',
        lens: lens || 'Standard Prime',
        aperture: 'f/2.8',
        shutterSpeed: '1/250s',
        iso: '200',
        focalLength: '50mm',
      },
      isCustomUpload: true,
    };

    onAddPhoto(newPhoto);
    onClose();
  };

  return (
    <div
      id="upload-photo-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <h3 className="text-base font-bold text-stone-900 font-display">
              Add Photo to Gallery
            </h3>
            <p className="text-xs text-stone-500">
              Upload local photograph or paste an image link
            </p>
          </div>
          <button
            id="btn-close-upload-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Upload Mode Selector */}
          <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setUseUrlMode(false)}
              className={`flex-1 py-1.5 rounded-lg transition ${
                !useUrlMode ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Upload from Computer
            </button>
            <button
              type="button"
              onClick={() => setUseUrlMode(true)}
              className={`flex-1 py-1.5 rounded-lg transition ${
                useUrlMode ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Image URL Link
            </button>
          </div>

          {/* Drag and Drop Zone or URL Input */}
          {!useUrlMode ? (
            <div>
              <div
                id="upload-dropzone"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition text-center ${
                  dragActive
                    ? 'border-rose-500 bg-rose-50/50'
                    : 'border-stone-300 hover:border-stone-400 bg-stone-50/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  id="file-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="relative w-full max-h-48 flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Upload Preview"
                      className="max-h-40 rounded-lg object-contain shadow-sm"
                    />
                    <span className="text-xs text-rose-600 font-medium mt-2">
                      Click or drag new image to replace
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-stone-800">
                      Drag & drop your photograph here
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      or click to browse from your device
                    </p>
                    <p className="text-[10px] text-stone-400 mt-2 font-mono">
                      PNG, JPG, WebP supported
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Direct Image URL
              </label>
              <div className="flex gap-2">
                <input
                  id="image-url-input"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>
              {imageUrlInput && (
                <div className="mt-2 p-2 bg-stone-100 rounded-xl text-center">
                  <img
                    src={imageUrlInput}
                    alt="Preview"
                    className="max-h-36 mx-auto rounded-lg object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Title *
              </label>
              <input
                id="photo-title-input"
                type="text"
                required
                placeholder="e.g. Golden Gate Mist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category
              </label>
              <select
                id="photo-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 bg-white"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Description / Caption
            </label>
            <textarea
              id="photo-desc-input"
              rows={2}
              placeholder="Tell the story behind this shot..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
            />
          </div>

          {/* Author info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Photographer Name
              </label>
              <input
                id="photo-author-input"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Social Handle
              </label>
              <input
                id="photo-handle-input"
                type="text"
                value={authorHandle}
                onChange={(e) => setAuthorHandle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>

          {/* Gear Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Camera Body
              </label>
              <input
                id="photo-camera-input"
                type="text"
                placeholder="e.g. Sony A7 IV"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Lens
              </label>
              <input
                id="photo-lens-input"
                type="text"
                placeholder="e.g. 24-70mm f/2.8"
                value={lens}
                onChange={(e) => setLens(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition"
            >
              Cancel
            </button>
            <button
              id="btn-submit-photo"
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-semibold rounded-xl shadow-xs transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Publish Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
