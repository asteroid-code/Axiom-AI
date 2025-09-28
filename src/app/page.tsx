import Header from '../components/layout/Header'
import Hero from '../components/content/Hero'
import ArticleGrid from '../components/content/ArticleGrid'
import { SupabaseTest } from '../components/ui/SupabaseTest'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <SupabaseTest /> {/* Temporary test component */}
      <Hero />
      <ArticleGrid />
    </main>
  )
}
