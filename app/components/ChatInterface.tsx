'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import MessageInput from './MessageInput';
import ChatHistory from './ChatHistory';
import ConversationStarters from './ConversationStarters';
// import PlantImage from './PlantImage';

const welcomeMessages = [
  "Salut je suis Nicolas, votre assistant jardinage !",
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState('');
  const [conversationStarters, setConversationStarters] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const fetchConversationStarters = async () => {
      try {
        console.log('Fetching conversation starters...');
        const timestamp = Date.now();
        const response = await fetch(`/api/conversation-starters?t=${timestamp}`, {
          cache: 'no-store'
        });
        const data = await response.json();
        console.log('Received conversation starters:', data.starters);
        setConversationStarters(data.starters);
      } catch (error) {
        console.error('Error fetching conversation starters:', error);
      }
    };

    fetchConversationStarters();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentAssistantMessage]);

  const handleSendMessage = async (message: string) => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
    setIsLoading(true);

    try {
      // Extract plant name
      console.log('Extracting plant name...');
      const extractResponse = await fetch('/api/extract-plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      const { plantName } = await extractResponse.json();
      console.log('Extracted plant name:', plantName);

      // Add the message with plantName to the state
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: message, plantName }]);

      // Generate answer
      console.log('Generating answer...');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: message }].map(({ role, content }) => ({ role, content }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullMessage = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  fullMessage += parsed.text;
                  setCurrentAssistantMessage(fullMessage);
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            }
          }
        }
        console.log('Full assistant message:', fullMessage);
        setMessages(prevMessages => [
          ...prevMessages,
          { role: 'assistant', content: fullMessage }
        ]);
        setCurrentAssistantMessage('');

        // Search for links if a plant name was extracted
        if (plantName && plantName !== 'No plant') {
          const searchResponse = await fetch(`/api/search-links?query=${encodeURIComponent(plantName)}`);
          const { links } = await searchResponse.json();
          if (links && links.length > 0) {
            setMessages(prevMessages => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              if (lastMessage.role === 'assistant') {
                // Ajouter les liens au dernier message de l'assistant
                return [
                  ...prevMessages.slice(0, -1),
                  { ...lastMessage, links }
                ];
              } else {
                // Si le dernier message n'est pas de l'assistant, ajouter un nouveau message
                return [
                  ...prevMessages,
                  { role: 'assistant', content: '', links }
                ];
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'user', content: message },
        { role: 'assistant', content: "Désolé, une erreur s'est produite." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 relative">
        {!hasUserInteracted ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Image
              src="/Gardener.png"
              alt="Nicolas le jardinier"
              width={200}
              height={200}
            />
            <p className="mt-4 text-xl font-semibold text-center">
              {welcomeMessages[0]}
            </p>
          </div>
        ) : (
          <ChatHistory 
            messages={messages} 
            showWelcomeMessages={false}
            welcomeMessages={welcomeMessages}
            currentAssistantMessage={currentAssistantMessage}
          />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4">
        {!hasUserInteracted && conversationStarters.length > 0 && (
          <ConversationStarters onSelect={handleSendMessage} starters={conversationStarters} />
        )}
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;