'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-center space-x-4 py-3">
          <li>
            <Link href="/" className={`px-4 py-2 rounded-full ${pathname === '/' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-indigo-100'}`}>
              Nicolas
            </Link>
          </li>
          <li>
            <Link href="/get-inspired" className={`px-4 py-2 rounded-full ${pathname === '/get-inspired' ? 'bg-indigo-500 text-white' : 'text-gray-700 hover:bg-indigo-100'}`}>
              S'inspirer
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
