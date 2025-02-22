import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { processUploadedImage } from '../../utils/imageProcessing';
import { saveImageToLibrary } from '../../utils/imageLibrary';

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
}

export default function ImageUpload({ onImageSelect }: ImageUploadProps) {
  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const processedImage = await processUploadedImage(file);
      saveImageToLibrary(processedImage.url);
      onImageSelect(processedImage.url);
    } catch (error) {
      console.error('Failed to process image:', error);
    }
  }, [onImageSelect]);

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Upload image"
      />
      <button className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-500 transition flex items-center justify-center gap-2">
        <Upload className="w-5 h-5" />
        Upload your own template
      </button>
    </div>
  );
}