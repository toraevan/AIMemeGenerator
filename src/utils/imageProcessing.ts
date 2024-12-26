interface ProcessedImage {
  url: string;
  width: number;
  height: number;
}

export const processUploadedImage = (file: File): Promise<ProcessedImage> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        // Max dimensions should match template sizes
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 300;
        
        let width = image.width;
        let height = image.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = width * ratio;
          height = height * ratio;
        }
        
        // Create canvas to resize image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(image, 0, 0, width, height);
        
        resolve({
          url: canvas.toDataURL('image/jpeg', 0.9),
          width,
          height
        });
      };
      
      image.onerror = () => reject(new Error('Failed to load image'));
      image.src = reader.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};