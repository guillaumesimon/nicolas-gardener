'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const gardenStyles = [
  { value: 'english', label: 'Jardin Anglais' },
  { value: 'japanese', label: 'Jardin Japonais' },
  { value: 'mediterranean', label: 'Jardin Méditerranéen' },
  { value: 'french', label: 'Jardin à la Française' },
  { value: 'modern', label: 'Jardin Moderne' },
];

const popularPlants = [
  'Rose', 'Lavande', 'Erable du japon', 'Tulipe', 'Orchidée',
  'Lys', 'Marguerite', 'Hortensia', 'Pivoine', 'Dahlia',
  'Jasmin', 'Fougère', 'Géranium', 'Bambou', 'Olivier'
];

export default function GetInspired() {
  const [prompt, setPrompt] = useState('');
  const [gardenStyle, setGardenStyle] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [improvedPrompt, setImprovedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, gardenStyle }),
      });
      const data = await response.json();
      setGeneratedImage(data.image);
      setImprovedPrompt(data.improvedPrompt);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlantClick = (plant: string) => {
    setPrompt(prev => `${prev}${prev ? ' ' : ''}${plant}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Créez le jardin de vos rêves !</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <select
          value={gardenStyle}
          onChange={(e) => setGardenStyle(e.target.value)}
          className="w-full p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-800"
        >
          <option value="">Choisissez un style de jardin</option>
          {gardenStyles.map((style) => (
            <option key={style.value} value={style.value}>
              {style.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Quelles plantes voulez vous planter ?"
          className="w-full p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-800 placeholder-gray-400"
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {popularPlants.map((plant, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePlantClick(plant)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-full text-sm transition-colors duration-200"
            >
              {plant}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Magie verte en cours...' : 'Fais moi rêver Nicolas !'}
        </button>
      </form>
      {generatedImage && (
        <div className="mt-8 w-full">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
            <Image 
              src={generatedImage}
              alt="Generated garden image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
