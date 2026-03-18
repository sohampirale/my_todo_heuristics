'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/projects', label: 'Projects' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/search', label: 'Search' },
  { href: '/settings', label: 'Settings' },
  { href: '/auth', label: 'Auth' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/research', label: 'Research' },
  { href: '/admin/seeds', label: 'Admin' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            data-testid="nav-logo"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">TodoApp</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
