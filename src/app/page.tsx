import Header from '../components/layout/Header'
import Hero from '../components/content/Hero'
import ArticleGrid from '../components/content/ArticleGrid'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ArticleGrid />
    </main>
  )
}
