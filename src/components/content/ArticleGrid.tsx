'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllArticles } from '../../services/article';
import { Article } from '../../types/article';

const ARTICLES_PER_PAGE = 6;

function ArticleCard({ id, title, content, image_url, created_at, source, processed_by_ai, trend_score, trending_topics }: Article) {
  const formattedDate = new Date(created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Placeholder for estimated reading time (e.g., 200 words per minute)
  const readingTime = content ? Math.ceil(content.split(' ').length / 200) : 5; // Default 5 mins

  return (
    <Link href={`/article/${id}`} className="block glass-card rounded-2xl overflow-hidden hover-lift">
      <div className="relative w-full h-48 bg-gray-800 flex items-center justify-center">
        {image_url ? (
          <Image src={image_url} alt={title} layout="fill" objectFit="cover" className="rounded-t-lg" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
        <div className="absolute top-2 left-2 flex space-x-2">
          {processed_by_ai && (
            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium">AI Processed</span>
          )}
          {/* Placeholder for visual quality score */}
          {(trend_score || 0) > 70 && (
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium">Premium</span>
          )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gradient">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{content}</p>
        <div className="flex flex-wrap items-center justify-between text-gray-500 text-xs mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <span>{formattedDate}</span>
            <span className="mx-1">•</span>
            <span>{readingTime} min lectura</span>
          </div>
          {trending_topics && trending_topics.length > 0 && (
            <span className="ml-auto px-2 py-1 bg-gray-700 rounded-full text-xs">
              {trending_topics[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function ArticleCardSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="relative w-full h-48 bg-gray-800"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

interface ArticleGridProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

export default function ArticleGrid({ articles, loading, error }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="py-16 bg-dark"> {/* Changed bg-black to bg-dark for consistency */}
      <div className="container mx-auto px-4">
        {/* Section Header - Removed as it's now handled by HomePage */}
        {error && <div className="text-red-500 text-center py-8">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => <ArticleCardSkeleton key={i} />)
            : currentArticles.map((article) => <ArticleCard key={article.id} {...article} />)}
        </div>

        {/* Pagination */}
        {!loading && articles.length > 0 && (
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
        {!loading && articles.length === 0 && (
          <div className="text-center text-gray-400 py-8">No se encontraron artículos con los filtros aplicados.</div>
        )}
      </div>
    </section>
  );
}
