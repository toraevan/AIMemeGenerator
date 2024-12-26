// Font size adjustment utilities
export const adjustFontSize = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  initialFontSize: number,
  minFontSize: number = 10
): number => {
  let fontSize = initialFontSize;
  
  while (fontSize > minFontSize) {
    const { totalHeight } = calculateTextDimensions(ctx, text, maxWidth, fontSize);
    
    if (totalHeight <= maxHeight) {
      break;
    }

    fontSize -= 2;
    ctx.font = `bold ${fontSize}px Impact`;
  }

  return fontSize;
};

const calculateTextDimensions = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number
) => {
  ctx.font = `bold ${fontSize}px Impact`;
  const lineHeight = fontSize * 1.2;
  let totalHeight = 0;
  let line = "";

  text.split(" ").forEach((word) => {
    const testLine = `${line}${word} `;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && line !== "") {
      line = `${word} `;
      totalHeight += lineHeight;
    } else {
      line = testLine;
    }
  });

  if (line.trim()) {
    totalHeight += lineHeight;
  }

  return { totalHeight, lineHeight };
};