import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchArticles } from '@/services/article';
import { Article } from '@/types/article';
import { useDebounce } from 'use-debounce'; // Assuming this library is installed or a custom debounce hook is available

interface SearchFilters {
  categories: string[];
  minQuality?: number;
  dateRange?: '7d' | '30d' | 'custom';
  startDate?: string;
  endDate?: string;
  status?: 'aiProcessed' | 'rawContent' | 'trending';
  sources: string[];
}

interface UseSearchResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  query: string;
  filters: SearchFilters;
  setQuery: (q: string) => void;
  setFilters: (f: Partial<SearchFilters>) => void;
  clearFilter: (key: keyof SearchFilters | 'query') => void;
  totalResults: number;
}

const initialFilters: SearchFilters = {
  categories: [],
  sources: [],
};

export function useSearch(): UseSearchResult {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQueryState] = useState<string>(searchParams.get('q') || '');
  const [filters, setFiltersState] = useState<SearchFilters>(() => {
    const params = Object.fromEntries(searchParams.entries());
    return {
      ...initialFilters,
      categories: params.categories ? params.categories.split(',') : [],
      minQuality: params.minQuality ? parseFloat(params.minQuality) : undefined,
      dateRange: params.dateRange as SearchFilters['dateRange'],
      startDate: params.startDate,
      endDate: params.endDate,
      status: params.status as SearchFilters['status'],
      sources: params.sources ? params.sources.split(',') : [],
    };
  });

  const [debouncedQuery] = useDebounce(query, 500);
  const [debouncedFilters] = useDebounce(filters, 500);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const updateUrl = useCallback(
    (newQuery: string, newFilters: SearchFilters) => {
      const params = new URLSearchParams();
      if (newQuery) params.set('q', newQuery);
      if (newFilters.categories.length > 0) params.set('categories', newFilters.categories.join(','));
      if (newFilters.minQuality !== undefined) params.set('minQuality', newFilters.minQuality.toString());
      if (newFilters.dateRange) params.set('dateRange', newFilters.dateRange);
      if (newFilters.startDate) params.set('startDate', newFilters.startDate);
      if (newFilters.endDate) params.set('endDate', newFilters.endDate);
      if (newFilters.status) params.set('status', newFilters.status);
      if (newFilters.sources.length > 0) params.set('sources', newFilters.sources.join(','));

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchArticles(debouncedQuery, debouncedFilters);
        setArticles(results);
        setTotalResults(results.length);
      } catch (err) {
        setError('Failed to fetch search results.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
    updateUrl(debouncedQuery, debouncedFilters);
  }, [debouncedQuery, debouncedFilters, updateUrl]);

  const setQuery = (q: string) => {
    setQueryState(q);
  };

  const setFilters = (newFilterUpdates: Partial<SearchFilters>) => {
    setFiltersState((prevFilters) => {
      const updatedFilters = { ...prevFilters, ...newFilterUpdates };
      // Special handling for array filters (e.g., categories, sources)
      if (newFilterUpdates.categories !== undefined) {
        updatedFilters.categories = newFilterUpdates.categories;
      }
      if (newFilterUpdates.sources !== undefined) {
        updatedFilters.sources = newFilterUpdates.sources;
      }
      return updatedFilters;
    });
  };

  const clearFilter = (key: keyof SearchFilters | 'query') => {
    if (key === 'query') {
      setQueryState('');
    } else {
      setFiltersState((prevFilters) => {
        const newFilters = { ...prevFilters };
        if (Array.isArray(newFilters[key])) {
          (newFilters[key] as any) = []; // Clear array filters
        } else {
          delete newFilters[key]; // Clear other filters
        }
        return newFilters;
      });
    }
  };

  return {
    articles,
    loading,
    error,
    query,
    filters,
    setQuery,
    setFilters,
    clearFilter,
    totalResults,
  };
}
