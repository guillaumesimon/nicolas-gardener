'use client';

import React from 'react';
import Image from 'next/image';

interface ChatHistoryProps {
  messages: Array<{ role: string; content: string }>;
  showWelcomeMessages: boolean;
  welcomeMessages: string[];
  currentAssistantMessage: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, showWelcomeMessages, welcomeMessages, currentAssistantMessage }) => {
  return (
    <div className="space-y-3 px-2 py-2 h-full">
      {showWelcomeMessages && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          {welcomeMessages.map((message, index) => (
            <p key={index} className="text-gray-300 mb-2 text-sm">{message}</p>
          ))}
        </div>
      )}
      {messages.map((message, index) => (
        <div key={index} className="flex items-start">
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 mr-2 mt-1"> {/* Ajouté mt-1 pour aligner avec le haut */}
              <Image
                src="/nicolas-avatar.png"
                alt="Nicolas"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          )}
          <div className={`flex flex-col ${message.role === 'user' ? 'items-end ml-auto' : 'items-start'}`}>
            <div
              className={`p-2 ${
                message.role === 'user' 
                  ? 'bg-indigo-100 text-indigo-800 rounded-t-2xl rounded-l-2xl rounded-br-xl' 
                  : 'bg-gray-100 text-gray-800 rounded-t-2xl rounded-r-2xl rounded-bl-xl'
              } ${message.role === 'user' ? 'max-w-[85%]' : 'max-w-[75%]'} break-words shadow-sm`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        </div>
      ))}
      {currentAssistantMessage && (
        <div className="flex justify-start items-end">
          <div className="mr-2 flex-shrink-0">
            <Image
              src="/nicolas-avatar.png"
              alt="Nicolas"
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <div className="p-2 bg-gray-100 text-gray-800 rounded-t-2xl rounded-r-2xl rounded-bl-xl max-w-[70%] break-words shadow-sm">
            <p className="text-sm">{currentAssistantMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;