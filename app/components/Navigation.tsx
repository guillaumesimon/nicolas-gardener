'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-2 py-1 z-50">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-indigo-100'}`}>
            Chat
          </Link>
        </li>
        <li>
          <Link href="/get-inspired" className={`px-4 py-2 rounded-full ${pathname === '/get-inspired' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-indigo-100'}`}>
            Get Inspired
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
