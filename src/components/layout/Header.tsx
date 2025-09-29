import Link from 'next/link';

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="glass-card p-4 flex items-center justify-between lg:justify-end">
      {/* Hamburger menu for mobile */}
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Logo for mobile (hidden on desktop as sidebar has it) */}
      <Link href="/" className="flex items-center space-x-3 lg:hidden">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
          AI
        </div>
        <span className="text-xl font-bold text-gradient">Axiom AI</span>
      </Link>

      {/* Placeholder for other header content (e.g., search, user profile) */}
      <div className="flex items-center space-x-4">
        {/* Example: Search icon */}
        <button className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
        {/* Example: User avatar */}
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </header>
  );
}
