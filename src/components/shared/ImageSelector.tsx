import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import { getImageLibrary } from '../../utils/imageLibrary';
import { Image, Library } from 'lucide-react'; // Changed ImageGallery to Image

interface ImageSelectorProps {
  onImageSelect: (imageUrl: string) => void;
  selectedImage: string | null;
}

export default function ImageSelector({ onImageSelect, selectedImage }: ImageSelectorProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'library'>('templates');
  const [userLibrary, setUserLibrary] = useState(getImageLibrary());
  
  const templates = [
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=300&fit=crop',
  ];

  useEffect(() => {
    const handleStorageChange = () => {
      setUserLibrary(getImageLibrary());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
            activeTab === 'templates'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Image className="w-5 h-5" />
          Templates
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
            activeTab === 'library'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Library className="w-5 h-5" />
          My Library ({userLibrary.length})
        </button>
      </div>

      {activeTab === 'templates' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {templates.map((template, index) => (
            <div
              key={index}
              onClick={() => onImageSelect(template)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
                selectedImage === template ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              <img
                src={template}
                alt={`Template ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {userLibrary.map((image) => (
            <div
              key={image.id}
              onClick={() => onImageSelect(image.url)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition transform hover:scale-105 ${
                selectedImage === image.url ? 'ring-4 ring-purple-500' : ''
              }`}
            >
              <img
                src={image.url}
                alt={`User uploaded ${image.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {userLibrary.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No images in your library yet. Upload some images to get started!
            </div>
          )}
        </div>
      )}

      <ImageUpload onImageSelect={onImageSelect} />
    </div>
  );
}