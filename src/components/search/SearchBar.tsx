'use client';

import React from 'react';
import { useSearch } from '@/hooks/useSearch';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SearchBar({ onFocus, onBlur }: SearchBarProps) {
  const { query, setQuery, clearFilter } = useSearch();

  return (
    <div className="relative flex items-center w-full max-w-md mx-auto lg:mx-0 glass-card rounded-full px-4 py-2 shadow-lg">
      <svg
        className="w-5 h-5 text-gray-400 mr-3"
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
      <input
        type="text"
        placeholder="Buscar en Axiom AI..."
        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {query && (
        <button
          className="ml-2 text-gray-400 hover:text-white focus:outline-none"
          onClick={() => clearFilter('query')}
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
