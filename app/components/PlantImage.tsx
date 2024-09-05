import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import imageLoader from '../image-loader';

interface PlantImageProps {
  plantName: string;
}

const PlantImage: React.FC<PlantImageProps> = ({ plantName }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!plantName || plantName === 'No plant') return;

      console.log('Fetching image for plant:', plantName);
      try {
        const response = await fetch(`/api/image-search?query=${encodeURIComponent(plantName + ' plant')}`);
        const data = await response.json();
        if (data.imageUrl) {
          console.log('Image URL received:', data.imageUrl);
          setImageUrl(data.imageUrl);
        } else {
          console.log('No image URL received');
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [plantName]);

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-2 rounded-t-2xl rounded-r-2xl rounded-bl-xl max-w-[70%] shadow-sm">
      <div className="relative aspect-w-16 aspect-h-9 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={plantName}
          className="rounded-lg object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
      </div>
      {imageError && <p className="text-sm text-red-500">Impossible de charger l&apos;image</p>}
      <p className="text-sm text-gray-800">Voici une image de {plantName}</p>
    </div>
  );
};

export default PlantImage;
