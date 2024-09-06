import React from 'react';
import Image from 'next/image';

interface Link {
  title: string;
  link: string;
  favicon: string;
}

interface SearchLinksProps {
  links: Link[];
}

const SearchLinks: React.FC<SearchLinksProps> = ({ links }) => {
  if (links.length === 0) return null;

  const truncateUrl = (url: string) => {
    const domain = new URL(url).hostname;
    return domain.startsWith('www.') ? domain.slice(4) : domain;
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => (
          <a 
            key={index} 
            href={link.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-2 max-w-[200px]"
          >
            <div className="flex items-center w-full">
              {link.favicon && (
                <Image 
                  src={link.favicon} 
                  alt="" 
                  width={16} 
                  height={16} 
                  className="mr-2 flex-shrink-0" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="overflow-hidden">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{link.title}</h3>
                <span className="text-xs text-gray-500 truncate block">{truncateUrl(link.link)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchLinks;