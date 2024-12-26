import React from 'react';
import { AVAILABLE_FONTS } from '../../constants/fonts';
import { TextStyle } from '../../types/meme';

interface TextControlsProps {
  label: string;
  text: string;
  style: TextStyle;
  onTextChange: (text: string) => void;
  onStyleChange: (style: TextStyle) => void;
  disabled?: boolean;
}

export default function TextControls({
  label,
  text,
  style,
  onTextChange,
  onStyleChange,
  disabled = false,
}: TextControlsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          disabled={disabled}
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition disabled:bg-gray-100"
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font
            </label>
            <select
              value={style.font}
              onChange={(e) => onStyleChange({ ...style, font: e.target.value })}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            >
              {AVAILABLE_FONTS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <input
              type="number"
              value={style.fontSize}
              onChange={(e) => onStyleChange({
                ...style,
                fontSize: Math.max(0, Math.min(200, Number(e.target.value)))
              })}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Font size"
              min={0}
              max={200}
            />
            <div className="mt-1 text-xs text-gray-500">
              Size: 0 to 200 pixels
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={style.position.x}
              onChange={(e) => onStyleChange({
                ...style,
                position: { ...style.position, x: Number(e.target.value) }
              })}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="X"
              min={0}
              max={100}
            />
            <input
              type="number"
              value={style.position.y}
              onChange={(e) => onStyleChange({
                ...style,
                position: { ...style.position, y: Number(e.target.value) }
              })}
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="Y"
              min={-100}
              max={100}
            />
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Y: -100 to 100 (negative moves text down)
          </div>
        </div>
      </div>
    </div>
  );
}