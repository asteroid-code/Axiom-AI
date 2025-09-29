'use client';

import React, { useState } from 'react';
import Hero from '../components/content/Hero';
import ArticleGrid from '../components/content/ArticleGrid';
import SearchBar from '../components/search/SearchBar';
import FilterPanel from '../components/search/FilterPanel';
import { useSearch } from '@/hooks/useSearch';

export default function Home() {
  const { articles, loading, error, query, filters, clearFilter, totalResults } = useSearch();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const activeFiltersCount =
    (filters.categories?.length || 0) +
    (filters.sources?.length || 0) +
    (filters.status ? 1 : 0) +
    (filters.minQuality !== undefined ? 1 : 0) +
    (filters.dateRange ? 1 : 0);

  return (
    <main className="min-h-screen">
      <Hero />
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
            <SearchBar />
            <div className="relative">
              <button
                onClick={() => setIsFilterPanelOpen(true)}
                className="glass-card px-6 py-2 rounded-full text-white flex items-center space-x-2 hover-lift"
              >
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-blue-600 rounded-full text-xs">
                    {activeFiltersCount}
                  </span>
                )}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(query || activeFiltersCount > 0) && (
            <div className="mb-8 flex flex-wrap gap-2 items-center">
              <span className="text-gray-400 text-sm">Filtros Activos:</span>
              {query && (
                <FilterChip label={`Búsqueda: "${query}"`} onClose={() => clearFilter('query')} />
              )}
              {filters.categories.map((cat) => (
                <FilterChip key={cat} label={`Categoría: ${cat}`} onClose={() => clearFilter('categories')} />
              ))}
              {filters.sources.map((src) => (
                <FilterChip key={src} label={`Fuente: ${src}`} onClose={() => clearFilter('sources')} />
              ))}
              {filters.status && (
                <FilterChip label={`Estado: ${filters.status}`} onClose={() => clearFilter('status')} />
              )}
              {filters.minQuality !== undefined && (
                <FilterChip label={`Calidad > ${filters.minQuality * 100}%`} onClose={() => clearFilter('minQuality')} />
              )}
              {filters.dateRange && (
                <FilterChip label={`Fecha: ${filters.dateRange}`} onClose={() => clearFilter('dateRange')} />
              )}
            </div>
          )}

          {/* Search Results Info */}
          <div className="mb-8 text-center text-gray-300">
            {loading ? (
              <span>Cargando resultados...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <span>
                Mostrando {totalResults} resultados
                {query && ` para "${query}"`}
              </span>
            )}
          </div>

          <ArticleGrid articles={articles} loading={loading} error={error} />
        </div>
      </section>

      <FilterPanel isOpen={isFilterPanelOpen} onClose={() => setIsFilterPanelOpen(false)} />
    </main>
  );
}

interface FilterChipProps {
  label: string;
  onClose: () => void;
}

function FilterChip({ label, onClose }: FilterChipProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      {label}
      <button
        type="button"
        className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:bg-white focus:text-blue-600"
        onClick={onClose}
      >
        <span className="sr-only">Remove filter</span>
        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  );
}
