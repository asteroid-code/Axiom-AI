import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  imageUrl?: string;
}

export function ArticleCard({ title, description, date, slug, imageUrl }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <div className="bg-gray rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
        {imageUrl && (
          <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
          <p className="text-light opacity-80 text-sm flex-grow">{description}</p>
          <p className="text-xs text-light opacity-60 mt-4">{date}</p>
        </div>
      </div>
    </Link>
  );
}
