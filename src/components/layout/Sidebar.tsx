'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getArticleCategories,
  getTrendingTopics,
  getArticleStats,
} from '@/services/article';

interface Category {
  category: string;
  count: number;
}

interface Topic {
  topic: string;
  count: number;
}

interface Stats {
  total: number;
  aiProcessed: number;
  rawContent: number;
}

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<Topic[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, aiProcessed: 0, rawContent: 0 });
  const [activeFilter, setActiveFilter] = useState<string>('all'); // 'all', 'aiProcessed', 'rawContent', 'trending'

  useEffect(() => {
    async function fetchData() {
      setCategories(await getArticleCategories());
      setTrendingTopics(await getTrendingTopics());
      setStats(await getArticleStats());
    }
    fetchData();
  }, []);

  return (
    <aside className="w-80 fixed left-0 top-0 h-screen glass-card p-6 flex flex-col text-white overflow-y-auto">
      {/* Logo Axiom AI */}
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-3">
          {/* Placeholder for Axiom AI Logo */}
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-lg font-bold">
            AI
          </div>
          <span className="text-2xl font-bold text-gradient">Axiom AI</span>
        </Link>
      </div>

      {/* Navegación Principal */}
      <nav className="mb-8">
        <h3 className="text-gray-400 text-xs uppercase mb-3">AXIOM AI</h3>
        <ul>
          <SidebarLink href="/" icon="🏠" label="Home" />
          <SidebarLink href="/ai-articles" icon="🤖" label="AI Articles" />
          <SidebarLink href="/videos" icon="🎥" label="Videos" />
          <SidebarLink href="/trending" icon="🔥" label="Trending" />
        </ul>
      </nav>

      {/* Categorías Dinámicas */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-xs uppercase mb-3">CATEGORÍAS</h3>
        <ul>
          {categories.map((cat) => (
            <SidebarLink
              key={cat.category}
              href={`/category/${cat.category.toLowerCase().replace(/\s+/g, '-')}`}
              label={`${cat.category} (${cat.count})`}
            />
          ))}
        </ul>
      </div>

      {/* Trending Topics */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-xs uppercase mb-3">TRENDING TOPICS</h3>
        <ul>
          {trendingTopics.map((topic) => (
            <SidebarLink
              key={topic.topic}
              href={`/topic/${topic.topic.toLowerCase().replace(/\s+/g, '-')}`}
              label={`${topic.topic} (${topic.count} articles)`}
            />
          ))}
        </ul>
      </div>

      {/* Filtros de Estado */}
      <div className="mb-8">
        <h3 className="text-gray-400 text-xs uppercase mb-3">FILTROS</h3>
        <ul>
          <FilterItem
            label="AI Processed"
            active={activeFilter === 'aiProcessed'}
            onClick={() => setActiveFilter('aiProcessed')}
          />
          <FilterItem
            label="Raw Content"
            active={activeFilter === 'rawContent'}
            onClick={() => setActiveFilter('rawContent')}
          />
          <FilterItem
            label="Trending"
            active={activeFilter === 'trending'}
            onClick={() => setActiveFilter('trending')}
          />
          <FilterItem
            label="Videos"
            active={activeFilter === 'videos'}
            onClick={() => setActiveFilter('videos')}
          />
        </ul>
      </div>

      {/* Estadísticas */}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <h3 className="text-gray-400 text-xs uppercase mb-3">ESTADÍSTICAS</h3>
        <p className="text-sm text-gray-300">Total Artículos: {stats.total}</p>
        <p className="text-sm text-gray-300">Procesados por IA: {stats.aiProcessed}</p>
        <p className="text-sm text-gray-300">Contenido Crudo: {stats.rawContent}</p>
        {/* Tasa de actividad could be calculated here if needed */}
      </div>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  icon?: string;
  label: string;
}

function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center py-2 px-3 rounded-md text-sm hover:bg-gray-800 transition-colors duration-200"
      >
        {icon && <span className="mr-3">{icon}</span>}
        {label}
      </Link>
    </li>
  );
}

interface FilterItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function FilterItem({ label, active, onClick }: FilterItemProps) {
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex items-center w-full text-left py-2 px-3 rounded-md text-sm transition-colors duration-200 ${
          active
            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
            : 'hover:bg-gray-800'
        }`}
      >
        <span className="mr-3">{active ? '✅' : '⚪'}</span>
        {label}
      </button>
    </li>
  );
}
