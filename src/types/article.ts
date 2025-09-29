export interface Article {
  id: number;
  title: string;
  content?: string;
  content_es?: string;
  url: string;
  source: string;
  image_url?: string;
  created_at: string;
  processed_by_ai: boolean;
  title_es?: string;
  related_products?: any;
  trend_score?: number;
  trending_topics?: string[];
}
