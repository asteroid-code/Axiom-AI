export interface Article {
  id: string;
  title: string;
  content: string;
  content_es: string;
  source: string;
  url: string;
  image_url: string;
  trend_score: number;
  trending_topics: string[];
  processed_by_ai: boolean;
  created_at: string;
}
