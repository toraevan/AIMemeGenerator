// Text rendering utilities
export const calculateTextHeight = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  lineHeight: number
): number => {
  const words = text.split(" ");
  let line = "";
  let totalHeight = lineHeight; // Start with one line height

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && line !== "") {
      line = `${word} `;
      totalHeight += lineHeight;
    } else {
      line = testLine;
    }
  });

  return totalHeight;
};

export const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  opacity: number = 1
): number => {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  const lines: string[] = [];

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && line !== "") {
      lines.push(line.trim());
      line = `${word} `;
    } else {
      line = testLine;
    }
  });

  if (line.trim()) {
    lines.push(line.trim());
  }

  const currentAlpha = ctx.globalAlpha;
  ctx.globalAlpha = opacity;

  lines.forEach((line) => {
    renderTextWithOutline(ctx, line, x, currentY);
    currentY += lineHeight;
  });

  ctx.globalAlpha = currentAlpha;
  return currentY - y;
};

export const renderTextWithOutline = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) => {
  [-2, -1, 0, 1, 2].forEach((offsetX) => {
    [-2, -1, 0, 1, 2].forEach((offsetY) => {
      ctx.strokeText(text, x + offsetX, y + offsetY);
    });
  });
  ctx.fillText(text, x, y);
};