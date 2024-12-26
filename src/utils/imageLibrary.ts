interface LibraryImage {
  id: string;
  url: string;
  timestamp: number;
}

const LIBRARY_KEY = 'meme-generator-library';

export const saveImageToLibrary = (imageUrl: string): void => {
  const library = getImageLibrary();
  const newImage: LibraryImage = {
    id: generateId(),
    url: imageUrl,
    timestamp: Date.now()
  };
  
  library.unshift(newImage);
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
};

export const getImageLibrary = (): LibraryImage[] => {
  const library = localStorage.getItem(LIBRARY_KEY);
  return library ? JSON.parse(library) : [];
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};