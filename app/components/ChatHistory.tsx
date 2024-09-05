'use client';

import React from 'react';
import Image from 'next/image';
import PlantImage from './PlantImage';

interface ChatHistoryProps {
  messages: Array<{ role: string; content: string; plantName?: string }>;
  showWelcomeMessages: boolean;
  welcomeMessages: string[];
  currentAssistantMessage: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, showWelcomeMessages, welcomeMessages, currentAssistantMessage }) => {
  return (
    <div className="space-y-4 p-2 h-full">
      {showWelcomeMessages && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          {welcomeMessages.map((message, index) => (
            <p key={index} className="text-gray-300 mb-2 text-sm">{message}</p>
          ))}
        </div>
      )}
      {messages.map((message, index) => (
        <React.Fragment key={index}>
          <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}>
            {message.role === 'assistant' && (
              <div className="flex-shrink-0 mr-2 mt-1">
                <Image
                  src="/nicolas-avatar.png"
                  alt="Nicolas"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
            )}
            <div className={`p-2 ${
              message.role === 'user' 
                ? 'bg-indigo-100 text-indigo-800 rounded-t-2xl rounded-l-2xl rounded-br-xl' 
                : 'bg-gray-100 text-gray-800 rounded-t-2xl rounded-r-2xl rounded-bl-xl'
            } max-w-[70%] break-words shadow-sm`}>
              <p className="text-sm">{message.content}</p>
            </div>
            {message.role === 'user' && <div className="w-6 ml-2" />}
          </div>
          {message.role === 'user' && message.plantName && message.plantName !== 'No plant' && (
            <div className="flex justify-start items-end mt-4">
              <div className="flex-shrink-0 mr-2 mt-1">
                <Image
                  src="/nicolas-avatar.png"
                  alt="Nicolas"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </div>
              <div className="max-w-[50%]"> {/* Ajusté pour réduire la taille maximale */}
                <PlantImage plantName={message.plantName} />
              </div>
            </div>
          )}
        </React.Fragment>
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