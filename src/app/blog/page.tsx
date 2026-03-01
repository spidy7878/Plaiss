import { Header } from '@/components/header'
import { BLOG_POSTS } from '@/data/blog-posts'
import Link from 'next/link'

export const metadata = {
  title: 'Blog — Plaiss',
  description:
    'Insights on furniture, interior design, and smart home shopping from Plaiss.',
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Our Blog
        </h1>
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Design tips, home inspiration, and the latest from Plaiss.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h2 className="text-lg font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-foreground group-hover:text-primary transition-colors">
                    Read
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:translate-x-0.5 transition-transform"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
