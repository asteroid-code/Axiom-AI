'use client';

import { getArticleById } from '../../../services/article';
import { Article } from '../../../types/article';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Image from 'next/image';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleById(params.id);

  if (!article) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Header />
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-lg text-gray-400">The article you are looking for does not exist.</p>
        </section>
        <Footer />
      </main>
    );
  }

  const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <section className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          {article.image_url && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image src={article.image_url} alt={article.title} layout="fill" objectFit="cover" />
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-primary">{article.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-8">
            <span>{formattedDate}</span>
            {article.trending_topics && article.trending_topics.length > 0 && (
              <span className="ml-4 px-3 py-1 bg-gray-700 rounded-full text-xs">
                {article.trending_topics[0]}
              </span>
            )}
            {article.processed_by_ai && (
              <span className="ml-4 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-medium">AI Processed</span>
            )}
          </div>
          <div className="prose prose-invert text-gray-300 leading-relaxed">
            <p>{article.content}</p>
          </div>
        </article>
      </section>
      <Footer />
    </main>
  );
}
