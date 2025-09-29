import { supabase } from './supabase';
import { Article } from '../types/article';

export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    return null;
  }

  return data as Article;
}
