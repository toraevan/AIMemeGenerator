import React, { useRef } from 'react';
import { Download, Trash2, Image as ImageIcon, Edit } from 'lucide-react';
import { GeneratedMeme } from '../../types/meme';
import MemeCanvas from '../shared/MemeCanvas';
import { downloadMeme } from '../../utils/downloadUtils';

interface MemeHistoryProps {
  memes: GeneratedMeme[];
  onDeleteMeme: (id: string) => void;
  onEditMeme: (meme: GeneratedMeme) => void;
}

export default function MemeHistory({ memes, onDeleteMeme, onEditMeme }: MemeHistoryProps) {
  const canvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const handleDownload = (meme: GeneratedMeme) => {
    const canvas = canvasRefs.current.get(meme.id);
    if (canvas) {
      downloadMeme(canvas, `meme-${meme.id}.png`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Your Memes</h2>
      </div>

      <div className="space-y-6">
        {memes.map((meme) => (
          <div key={meme.id} className="bg-gray-50 rounded-lg p-4">
            <MemeCanvas 
              imageUrl={meme.imageUrl}
              topText={meme.isAiGenerated ? meme.prompt : meme.topText}
              bottomText={meme.bottomText}
              topTextStyle={meme.topTextStyle}
              bottomTextStyle={meme.bottomTextStyle}
              onCanvasReady={(canvas) => canvasRefs.current.set(meme.id, canvas)}
            />
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className="text-xs text-gray-400">
                  {meme.isAiGenerated ? '🤖 AI Generated' : '✍️ Manually Created'}
                </span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onEditMeme(meme)}
                  className="p-2 text-gray-600 hover:text-blue-500 transition"
                  aria-label="Edit meme"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDownload(meme)}
                  className="p-2 text-gray-600 hover:text-purple-500 transition"
                  aria-label="Download meme"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDeleteMeme(meme.id)}
                  className="p-2 text-gray-600 hover:text-red-500 transition"
                  aria-label="Delete meme"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {memes.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No memes yet. Start creating!</p>
          </div>
        )}
      </div>
    </div>
  );
}