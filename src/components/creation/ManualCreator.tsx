import React, { useState } from 'react';
import ImageSelector from '../shared/ImageSelector';
import MemeCanvas from '../shared/MemeCanvas';
import { GeneratedMeme } from '../../types/meme';

interface ManualCreatorProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
}

export default function ManualCreator({ onMemeGenerated }: ManualCreatorProps) {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const createMeme = () => {
    if (!selectedTemplate) return;
    
    const newMeme: GeneratedMeme = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl: selectedTemplate,
      topText,
      bottomText,
      timestamp: new Date(),
      isAiGenerated: false
    };
    
    onMemeGenerated(newMeme);
    setTopText('');
    setBottomText('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Top Text
          </label>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter top text..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bottom Text
          </label>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter bottom text..."
          />
        </div>
      </div>

      <ImageSelector onImageSelect={setSelectedTemplate} selectedImage={selectedTemplate} />

      <button
        onClick={createMeme}
        disabled={!selectedTemplate || (!topText && !bottomText)}
        className="w-full py-4 px-6 rounded-lg text-white font-medium transition bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Meme
      </button>
    </div>
  );
}