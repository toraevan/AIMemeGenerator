import React, { useState } from 'react';
import { Wand2, Pencil } from 'lucide-react';
import AiCreator from './AiCreator';
import ManualCreator from './ManualCreator';
import { GeneratedMeme } from '../../types/meme';

interface CreationModesProps {
  onMemeGenerated: (meme: GeneratedMeme) => void;
}

export default function CreationModes({ onMemeGenerated }: CreationModesProps) {
  const [mode, setMode] = useState<'ai' | 'manual'>('ai');

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('ai')}
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
            mode === 'ai'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Wand2 className="w-5 h-5" />
          AI Assisted
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition ${
            mode === 'manual'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Pencil className="w-5 h-5" />
          Manual Creation
        </button>
      </div>

      {mode === 'ai' ? (
        <AiCreator onMemeGenerated={onMemeGenerated} />
      ) : (
        <ManualCreator onMemeGenerated={onMemeGenerated} />
      )}
    </div>
  );
}