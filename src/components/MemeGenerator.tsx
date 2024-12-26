import React, { useState } from 'react';
import CreationModes from './creation/CreationModes';
import MemeHistory from './history/MemeHistory';
import MemeEditor from './edit/MemeEditor';
import { GeneratedMeme } from '../types/meme';

export default function MemeGenerator() {
  const [generatedMemes, setGeneratedMemes] = useState<GeneratedMeme[]>([]);
  const [editingMeme, setEditingMeme] = useState<GeneratedMeme | null>(null);

  const handleMemeGenerated = (meme: GeneratedMeme) => {
    setGeneratedMemes(prev => [meme, ...prev]);
  };

  const handleDeleteMeme = (id: string) => {
    setGeneratedMemes(prev => prev.filter(meme => meme.id !== id));
  };

  const handleEditMeme = (meme: GeneratedMeme) => {
    setEditingMeme(meme);
  };

  const handleSaveEdit = (updatedMeme: GeneratedMeme) => {
    const updatedMemeWithTimestamp = {
      ...updatedMeme,
      timestamp: new Date() // Update timestamp to reflect the edit
    };
    
    setGeneratedMemes(prev =>
      prev.map(meme => 
        meme.id === updatedMemeWithTimestamp.id ? updatedMemeWithTimestamp : meme
      )
    );
    setEditingMeme(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Meme Magic Generator ✨
          </h1>
          <p className="text-gray-600">Create memes your way - with AI assistance or full creative control!</p>
        </header>

        {editingMeme ? (
          <MemeEditor
            meme={editingMeme}
            onSave={handleSaveEdit}
            onCancel={() => setEditingMeme(null)}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CreationModes onMemeGenerated={handleMemeGenerated} />
            <MemeHistory 
              memes={generatedMemes} 
              onDeleteMeme={handleDeleteMeme}
              onEditMeme={handleEditMeme}
            />
          </div>
        )}
      </div>
    </div>
  );
}