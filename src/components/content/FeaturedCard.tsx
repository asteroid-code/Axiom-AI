import Link from 'next/link';

interface FeaturedCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  imageUrl: string;
}

export function FeaturedCard({ title, description, date, slug, imageUrl }: FeaturedCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="block">
      <div className="bg-gray rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row">
        <img src={imageUrl} alt={title} className="w-full md:w-1/2 h-64 md:h-auto object-cover" />
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3 text-primary">{title}</h2>
          <p className="text-light opacity-80 text-lg mb-4">{description}</p>
          <p className="text-sm text-light opacity-60">{date}</p>
        </div>
      </div>
    </Link>
  );
}
