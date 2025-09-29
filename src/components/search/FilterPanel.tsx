'use client';

import React, { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { getArticleCategories } from '@/services/article'; // To get dynamic categories

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterPanel({ isOpen, onClose }: FilterPanelProps) {
  const { filters, setFilters, clearFilter } = useSearch();
  const [availableCategories, setAvailableCategories] = useState<{ category: string; count: number }[]>([]);
  const [availableSources, setAvailableSources] = useState<string[]>([]); // Assuming sources are fetched or hardcoded

  useEffect(() => {
    async function fetchFilterData() {
      const categories = await getArticleCategories();
      setAvailableCategories(categories);
      // For sources, we might need a dedicated service function or fetch all articles and extract unique sources
      // For now, let's use a placeholder or extract from existing articles if available
      // setAvailableSources(await getUniqueSources());
      setAvailableSources(['TechCrunch', 'Reuters', 'AI Journal', 'Other']); // Placeholder
    }
    fetchFilterData();
  }, []);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const newCategories = isChecked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    setFilters({ categories: newCategories });
  };

  const handleSourceChange = (source: string, isChecked: boolean) => {
    const newSources = isChecked
      ? [...filters.sources, source]
      : filters.sources.filter((s) => s !== source);
    setFilters({ sources: newSources });
  };

  const handleStatusChange = (status: 'aiProcessed' | 'rawContent' | 'trending' | undefined) => {
    setFilters({ status: status });
  };

  const handleMinQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ minQuality: parseFloat(e.target.value) });
  };

  const handleDateRangeChange = (range: '7d' | '30d' | 'custom' | undefined) => {
    setFilters({ dateRange: range, startDate: undefined, endDate: undefined });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="glass-card p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gradient">Filtros Avanzados</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.categories.map((cat) => (
            <FilterChip key={cat} label={`Categoría: ${cat}`} onClose={() => handleCategoryChange(cat, false)} />
          ))}
          {filters.sources.map((src) => (
            <FilterChip key={src} label={`Fuente: ${src}`} onClose={() => handleSourceChange(src, false)} />
          ))}
          {filters.status && (
            <FilterChip label={`Estado: ${filters.status}`} onClose={() => handleStatusChange(undefined)} />
          )}
          {filters.minQuality !== undefined && (
            <FilterChip label={`Calidad > ${filters.minQuality * 100}%`} onClose={() => setFilters({ minQuality: undefined })} />
          )}
          {filters.dateRange && (
            <FilterChip label={`Fecha: ${filters.dateRange}`} onClose={() => handleDateRangeChange(undefined)} />
          )}
          {/* Add more chips for other filters */}
        </div>

        {/* Categorías */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Por Categoría</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableCategories.map((cat) => (
              <label key={cat.category} className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  checked={filters.categories.includes(cat.category)}
                  onChange={(e) => handleCategoryChange(cat.category, e.target.checked)}
                />
                <span className="ml-2">{cat.category} ({cat.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Calidad */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Por Calidad (Score)</h4>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={filters.minQuality !== undefined ? filters.minQuality : 0}
            onChange={handleMinQualityChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-sm text-gray-400 mt-2 block">Mínimo: {(filters.minQuality || 0) * 100}%</span>
        </div>

        {/* Fecha */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Por Fecha</h4>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="dateRange"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.dateRange === '7d'}
                onChange={() => handleDateRangeChange('7d')}
              />
              <span className="ml-2">Últimos 7 días</span>
            </label>
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="dateRange"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.dateRange === '30d'}
                onChange={() => handleDateRangeChange('30d')}
              />
              <span className="ml-2">Últimos 30 días</span>
            </label>
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="dateRange"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.dateRange === 'custom'}
                onChange={() => handleDateRangeChange('custom')}
              />
              <span className="ml-2">Personalizado</span>
            </label>
            {filters.dateRange === 'custom' && (
              <div className="flex space-x-2 mt-2">
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => setFilters({ startDate: e.target.value })}
                  className="bg-gray-700 text-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => setFilters({ endDate: e.target.value })}
                  className="bg-gray-700 text-white rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            )}
          </div>
        </div>

        {/* Estado */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Por Estado</h4>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="status"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.status === 'aiProcessed'}
                onChange={() => handleStatusChange('aiProcessed')}
              />
              <span className="ml-2">AI Enhanced</span>
            </label>
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="status"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.status === 'rawContent'}
                onChange={() => handleStatusChange('rawContent')}
              />
              <span className="ml-2">Raw Content</span>
            </label>
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="status"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                checked={filters.status === 'trending'}
                onChange={() => handleStatusChange('trending')}
              />
              <span className="ml-2">Trending</span>
            </label>
          </div>
        </div>

        {/* Fuente */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Por Fuente</h4>
          <div className="grid grid-cols-2 gap-2">
            {availableSources.map((src) => (
              <label key={src} className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                  checked={filters.sources.includes(src)}
                  onChange={(e) => handleSourceChange(src, e.target.checked)}
                />
                <span className="ml-2">{src}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              setFilters({}); // Clear all filters
              clearFilter('query'); // Clear query as well
              onClose();
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>
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
