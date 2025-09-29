import { supabase } from '../lib/supabase';
import { Article } from '../types/article';

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, content, content_es, image_url, source, created_at, processed_by_ai, url, related_products, title_es')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    return null;
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, content, content_es, image_url, source, created_at, processed_by_ai, url, related_products, title_es')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching all articles:', error);
    return [];
  }
}


export async function getArticleCategories(): Promise<{ category: string; count: number }[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('category', { count: 'exact' })
      .not('category', 'is', null)
      .returns<{ category: string }[]>();

    if (error) throw error;

    const categoryCounts = data.reduce((acc, item) => {
      if (item.category) {
        acc[item.category] = (acc[item.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({ category, count }));
  } catch (error) {
    console.error('Error fetching article categories:', error);
    return [];
  }
}

export async function getTrendingTopics(): Promise<{ topic: string; count: number }[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('trending_topics')
      .not('trending_topics', 'is', null)
      .gt('trend_score', 70) // As per user's requirement for trending
      .limit(10); // Limit to top 10 trending articles for topic extraction

    if (error) throw error;

    const allTopics: string[] = [];
    data.forEach(article => {
      if (Array.isArray(article.trending_topics)) {
        allTopics.push(...article.trending_topics);
      }
    });

    const topicCounts = allTopics.reduce((acc, topic) => {
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Ensure only top 10 topics are returned
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    return [];
  }
}

export async function getArticleStats(): Promise<{ total: number; aiProcessed: number; rawContent: number }> {
  try {
    const { count: totalArticles, error: totalError } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true });
    if (totalError) throw totalError;

    const { count: aiProcessedArticles, error: aiError } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('processed_by_ai', true);
    if (aiError) throw aiError;

    const { count: rawContentArticles, error: rawError } = await supabase
      .from('articles')
      .select('*', { count: 'exact', head: true })
      .eq('processed_by_ai', false);
    if (rawError) throw rawError;

    return {
      total: totalArticles || 0,
      aiProcessed: aiProcessedArticles || 0,
      rawContent: rawContentArticles || 0,
    };
  } catch (error) {
    console.error('Error fetching article statistics:', error);
    return { total: 0, aiProcessed: 0, rawContent: 0 };
  }
}

export async function searchArticles(
  query: string,
  filters: {
    categories?: string[];
    minQuality?: number; // Using trend_score as quality
    dateRange?: '7d' | '30d' | 'custom';
    startDate?: string;
    endDate?: string;
    status?: 'aiProcessed' | 'rawContent' | 'trending';
    sources?: string[];
  }
): Promise<Article[]> {
  try {
    let dbQuery = supabase.from('articles').select('*');

    // Apply search query
    if (query) {
      dbQuery = dbQuery.or(
        `title.ilike.%${query}%,content.ilike.%${query}%,category.ilike.%${query}%`
      );
    }

    // Apply category filter
    if (filters.categories && filters.categories.length > 0) {
      dbQuery = dbQuery.in('category', filters.categories);
    }

    // Apply quality filter (using trend_score)
    if (filters.minQuality !== undefined) {
      dbQuery = dbQuery.gte('trend_score', filters.minQuality);
    }

    // Apply date filter
    if (filters.dateRange) {
      const now = new Date();
      let dateFilter: Date;
      if (filters.dateRange === '7d') {
        dateFilter = new Date(now.setDate(now.getDate() - 7));
        dbQuery = dbQuery.gte('created_at', dateFilter.toISOString());
      } else if (filters.dateRange === '30d') {
        dateFilter = new Date(now.setDate(now.getDate() - 30));
        dbQuery = dbQuery.gte('created_at', dateFilter.toISOString());
      } else if (filters.dateRange === 'custom' && filters.startDate) {
        dbQuery = dbQuery.gte('created_at', filters.startDate);
        if (filters.endDate) {
          dbQuery = dbQuery.lte('created_at', filters.endDate);
        }
      }
    }

    // Apply status filter
    if (filters.status) {
      if (filters.status === 'aiProcessed') {
        dbQuery = dbQuery.eq('processed_by_ai', true);
      } else if (filters.status === 'rawContent') {
        dbQuery = dbQuery.eq('processed_by_ai', false);
      } else if (filters.status === 'trending') {
        dbQuery = dbQuery.gt('trend_score', 70); // Using 70 as threshold for trending
      }
    }

    // Apply source filter
    if (filters.sources && filters.sources.length > 0) {
      dbQuery = dbQuery.in('source', filters.sources);
    }

    dbQuery = dbQuery.order('created_at', { ascending: false });

    const { data, error } = await dbQuery;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}
