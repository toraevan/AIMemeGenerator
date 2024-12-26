import React, { useEffect, useRef } from "react";
import { wrapText, calculateTextHeight } from "../../utils/textRendering";
import { TextStyle } from "../../types/meme";

interface MemeCanvasProps {
  imageUrl: string;
  topText?: string;
  bottomText?: string;
  topTextStyle?: TextStyle;
  bottomTextStyle?: TextStyle;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export default function MemeCanvas({
  imageUrl,
  topText = "",
  bottomText = "",
  topTextStyle = { font: 'Impact', fontSize: 48, position: { x: 50, y: 0} },
  bottomTextStyle = { font: 'Impact', fontSize: 48, position: { x: 50, y: 0 } },
  onCanvasReady,
}: MemeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      // Setup canvas
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Configure text style
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.textAlign = "center";
      ctx.miterLimit = 2;

      // Calculate dimensions
      const maxWidth = canvas.width * 0.8;

      // Render top text
      if (topText) {
        const topX = (canvas.width * topTextStyle.position.x) / 100;
        const topY = (canvas.height * topTextStyle.position.y) / 100;
        
        ctx.font = `bold ${topTextStyle.fontSize}px ${topTextStyle.font}`;
        wrapText(ctx, topText.toUpperCase(), topX, topY + topTextStyle.fontSize, maxWidth, topTextStyle.fontSize * 1.2);
      }

      // Render bottom text
      if (bottomText) {
        const bottomX = (canvas.width * bottomTextStyle.position.x) / 100;
        ctx.font = `bold ${bottomTextStyle.fontSize}px ${bottomTextStyle.font}`;
        
        // Calculate total height of bottom text
        const textHeight = calculateTextHeight(ctx, bottomText.toUpperCase(), maxWidth, bottomTextStyle.fontSize * 0.9);
        
        // Calculate Y position from bottom of canvas
        const bottomY = canvas.height - ((canvas.height * bottomTextStyle.position.y) / 100) - textHeight;
        
        wrapText(ctx, bottomText.toUpperCase(), bottomX, bottomY, maxWidth, bottomTextStyle.fontSize * 1.2);
      }

      onCanvasReady?.(canvas);
    };
  }, [imageUrl, topText, bottomText, topTextStyle, bottomTextStyle, onCanvasReady]);

  return <canvas ref={canvasRef} className="w-full h-auto rounded-lg" />;
}