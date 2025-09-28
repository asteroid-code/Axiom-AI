'use client';

import { useEffect, useState } from 'react';
import { getArticles } from '../../services/article';
import { Article } from '../../types/article';

export function SupabaseTest() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestArticles() {
      try {
        setLoading(true);
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (err) {
        setError('Failed to fetch articles from Supabase.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTestArticles();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-8">Loading Supabase test articles...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-6">Supabase Connection Test</h2>
      {articles.length === 0 ? (
        <p className="text-gray-400">No articles found in Supabase. Check your database and API keys.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="glass-card p-4 rounded-lg">
              <h3 className="text-xl font-bold text-primary">{article.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{article.source} - {new Date(article.created_at).toLocaleDateString()}</p>
              <p className="text-gray-500 text-xs mt-2">Trend Score: {article.trend_score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
