'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const gardenStyles = [
  { value: 'english', label: 'English Garden' },
  { value: 'japanese', label: 'Japanese Garden' },
  { value: 'mediterranean', label: 'Mediterranean Garden' },
  { value: 'french', label: 'French Garden' },
  { value: 'modern', label: 'Modern Garden' },
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

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Get Inspired by Natures Beauty!
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <select
          value={gardenStyle}
          onChange={(e) => setGardenStyle(e.target.value)}
          className="w-full p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-800"
        >
          <option value="">Select a garden style</option>
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
          placeholder="What leafy friends would you like to see blooming?
"
          className="w-full p-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Bring Your Garden Dreams to Life!'}
        </button>
      </form>
      {improvedPrompt && (
        <div className="mt-4 text-sm text-gray-600">
          <strong>Improved prompt:</strong> {improvedPrompt}
        </div>
      )}
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
