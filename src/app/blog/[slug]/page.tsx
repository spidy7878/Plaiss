import { notFound } from 'next/navigation'
import { BLOG_POSTS } from '@/data/blog-posts'
import { Header } from '@/components/header'
import Link from 'next/link'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — Plaiss Blog`,
    description: post.description,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  // Simple markdown-to-HTML: headers, bold, italic, lists, hr, tables, paragraphs
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n')
    const html: string[] = []
    let inList = false
    let inTable = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Horizontal rule
      if (/^---+$/.test(line.trim())) {
        if (inList) {
          html.push('</ul>')
          inList = false
        }
        if (inTable) {
          html.push('</tbody></table>')
          inTable = false
        }
        html.push('<hr class="my-8 border-t border-border" />')
        continue
      }

      // Table rows
      if (line.trim().startsWith('|')) {
        // Skip separator rows like |---|---|
        if (/^\|[\s\-|]+\|$/.test(line.trim())) continue

        const cells = line
          .split('|')
          .filter((c) => c.trim() !== '')
          .map((c) => c.trim())

        if (!inTable) {
          inTable = true
          html.push(
            '<table class="w-full text-sm my-6 border border-border rounded-lg overflow-hidden">'
          )
          html.push('<thead class="bg-muted"><tr>')
          cells.forEach((c) => {
            html.push(
              `<th class="px-4 py-2.5 text-left font-semibold text-foreground">${c}</th>`
            )
          })
          html.push('</tr></thead><tbody>')
          continue
        }

        html.push('<tr class="border-t border-border">')
        cells.forEach((c) => {
          html.push(`<td class="px-4 py-2.5 text-muted-foreground">${c}</td>`)
        })
        html.push('</tr>')
        continue
      }

      if (inTable && !line.trim().startsWith('|')) {
        html.push('</tbody></table>')
        inTable = false
      }

      // List items
      if (/^- /.test(line.trim())) {
        if (!inList) {
          inList = true
          html.push(
            '<ul class="list-disc pl-6 space-y-1.5 my-4 text-muted-foreground">'
          )
        }
        const content = line.trim().replace(/^- /, '')
        html.push(`<li>${applyInline(content)}</li>`)
        continue
      }

      if (inList && !/^- /.test(line.trim())) {
        html.push('</ul>')
        inList = false
      }

      // Numbered list items
      if (/^\d+\.\s/.test(line.trim())) {
        html.push(
          `<p class="my-1.5 text-muted-foreground pl-4">${applyInline(line.trim())}</p>`
        )
        continue
      }

      // Headings
      if (line.startsWith('### ')) {
        html.push(
          `<h4 class="text-lg font-semibold text-foreground mt-8 mb-3">${applyInline(line.slice(4))}</h4>`
        )
        continue
      }
      if (line.startsWith('## ')) {
        html.push(
          `<h3 class="text-2xl font-bold text-foreground mt-10 mb-4">${applyInline(line.slice(3))}</h3>`
        )
        continue
      }

      // Empty line
      if (line.trim() === '') continue

      // Regular paragraph
      html.push(
        `<p class="text-muted-foreground leading-relaxed my-3">${applyInline(line)}</p>`
      )
    }

    if (inList) html.push('</ul>')
    if (inTable) html.push('</tbody></table>')

    return html.join('\n')
  }

  const applyInline = (text: string) => {
    return text
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-foreground font-semibold">$1</strong>'
      )
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
  }

  return (
    <main className="min-h-screen bg-background font-sans">
      <Header />

      <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
          {post.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pb-6 border-b border-border text-sm text-muted-foreground">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {post.readTime}
          </span>

          <button className="ml-auto inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
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
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            Share
          </button>
        </div>

        {/* Featured image */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-border">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="mt-10 prose-custom"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
      </article>
    </main>
  )
}
