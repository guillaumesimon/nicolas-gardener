'use client';

import React from 'react';

interface ConversationStartersProps {
  onSelect: (starter: string) => void;
  starters: string[];
}

const ConversationStarters: React.FC<ConversationStartersProps> = ({ onSelect, starters }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {starters.map((starter, index) => (
        <button
          key={index}
          onClick={() => onSelect(starter)}
          className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-200"
        >
          {starter}
        </button>
      ))}
    </div>
  );
};

export default ConversationStarters;