import { supabase } from '../lib/supabase';
import { Article } from '../types/article';

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data as Article[];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('url_slug', slug) // Assuming 'url_slug' is the column for slug
    .single();

  if (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    return null;
  }

  return data as Article;
}
