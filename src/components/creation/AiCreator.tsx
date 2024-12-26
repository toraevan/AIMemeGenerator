import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ImageSelector from '../shared/ImageSelector';
import { GeneratedMeme } from '../../types/meme';
import { generateMemeText } from '../../services/openai';

interface AiCreatorProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
}

export default function AiCreator({ onMemeGenerated }: AiCreatorProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMeme = async () => {
    if (!prompt || !selectedTemplate) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const { topText, bottomText } = await generateMemeText(prompt);
      
      const newMeme: GeneratedMeme = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: selectedTemplate,
        topText,
        bottomText,
        prompt,
        timestamp: new Date(),
        isAiGenerated: true,
        topTextStyle: {
          font: 'Impact',
          fontSize: 48,
          position: { x: 50, y: 0 }
        },
        bottomTextStyle: {
          font: 'Impact',
          fontSize: 48,
          position: { x: 50, y: 0 }
        }
      };
      
      onMemeGenerated(newMeme);
      setPrompt('');
      setSelectedTemplate(null);
    } catch (err) {
      setError('Failed to generate meme. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your meme idea
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Let AI help you create the perfect meme..."
          />
          <Sparkles className="absolute right-3 bottom-3 text-purple-500 w-5 h-5" />
        </div>
      </div>

      <ImageSelector onImageSelect={setSelectedTemplate} selectedImage={selectedTemplate} />

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        onClick={generateMeme}
        disabled={!prompt || !selectedTemplate || isGenerating}
        className={`w-full py-4 px-6 rounded-lg text-white font-medium transition ${
          isGenerating
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        }`}
      >
        {isGenerating ? 'Generating...' : 'Generate with AI'}
      </button>
    </div>
  );
}