type Props = {
  params: Promise<{ category: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  return (
    <main className="min-h-screen pt-24 px-6 md:px-12">
      <h1 className="text-3xl font-bold capitalize">
        {category.replace(/-/g, ' ')}
      </h1>
    </main>
  )
}
