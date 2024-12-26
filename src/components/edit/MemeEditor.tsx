import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { GeneratedMeme, TextStyle } from '../../types/meme';
import MemeCanvas from '../shared/MemeCanvas';
import TextControls from './TextControls';

interface MemeEditorProps {
  meme: GeneratedMeme;
  onSave: (updatedMeme: GeneratedMeme) => void;
  onCancel: () => void;
}

const DEFAULT_STYLE: TextStyle = {
  font: 'Impact',
  fontSize: 48,
  position: { x: 50, y: 0 },
};

export default function MemeEditor({ meme, onSave, onCancel }: MemeEditorProps) {
  const [topText, setTopText] = useState(meme.isAiGenerated ? meme.prompt : meme.topText || '');
  const [bottomText, setBottomText] = useState(meme.bottomText || '');
  const [topTextStyle, setTopTextStyle] = useState<TextStyle>(
    meme.topTextStyle || { ...DEFAULT_STYLE }
  );
  const [bottomTextStyle, setBottomTextStyle] = useState<TextStyle>(
    meme.bottomTextStyle || { ...DEFAULT_STYLE }
  );

  const handleSave = () => {
    onSave({
      ...meme,
      topText: !meme.isAiGenerated ? topText : meme.prompt,
      bottomText,
      topTextStyle,
      bottomTextStyle,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onCancel}
          className="p-2 text-gray-600 hover:text-purple-500 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Edit Meme</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TextControls
            label="Top Text"
            text={topText}
            style={topTextStyle}
            onTextChange={setTopText}
            onStyleChange={setTopTextStyle}
            disabled={meme.isAiGenerated}
          />
          
          <TextControls
            label="Bottom Text"
            text={bottomText}
            style={bottomTextStyle}
            onTextChange={setBottomText}
            onStyleChange={setBottomTextStyle}
          />

          <button
            onClick={handleSave}
            className="w-full py-4 px-6 rounded-lg text-white font-medium transition bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Save Changes
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <MemeCanvas
            imageUrl={meme.imageUrl}
            topText={meme.isAiGenerated ? meme.prompt : topText}
            bottomText={bottomText}
            topTextStyle={topTextStyle}
            bottomTextStyle={bottomTextStyle}
          />
        </div>
      </div>
    </div>
  );
}