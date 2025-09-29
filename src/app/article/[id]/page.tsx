import { getArticleById } from '@/services/article';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

interface ArticleDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { id } = params;
  const article = await getArticleById(id);

  if (!article) {
    notFound(); // Handles not-found state
  }

  return (
    <div className="min-h-screen bg-dark text-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto glass-card p-8 rounded-lg shadow-lg hover-lift">
        {/* Header with title */}
        <h1 className="text-4xl font-bold text-gradient mb-4">
          {article.title_es || article.title}
        </h1>

        {/* Image hero or placeholder */}
        {article.image_url ? (
          <div className="relative w-full h-80 mb-8 rounded-md overflow-hidden">
            <Image
              src={article.image_url}
              alt={article.title_es || article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        ) : (
          <div className="w-full h-80 mb-8 rounded-md bg-gray-800 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        {/* Metadatos: fuente, fecha de publicación, Badge "AI Processed" */}
        <div className="flex flex-wrap items-center text-gray-400 text-sm mb-6">
          <span className="mr-4">Fuente: {article.source}</span>
          <span className="mr-4">Publicado: {format(new Date(article.created_at), 'dd/MM/yyyy')}</span>
          {article.processed_by_ai && (
            <span className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
              AI Processed
            </span>
          )}
        </div>

        {/* Contenido enriquecido (content_es) con estilos de texto */}
        <div
          className="prose prose-invert max-w-none text-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content_es || article.content || '' }}
        />

        {/* Botón de volver al feed */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-block bg-primary hover:bg-secondary text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out hover-lift">
            Volver al Feed
          </Link>
        </div>
      </div>
    </div>
  );
}
