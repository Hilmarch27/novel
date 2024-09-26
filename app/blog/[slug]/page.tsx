import prisma from '@/lib/prisma'

export default async function Blog({ params }: { params: { slug: string } }) {
  const blog = await prisma.post.findUnique({
    where: {
      slug: params.slug
    }
  })
  console.log('blog:', blog)

  if (!blog) {
    return <p>Blog not found</p>
  }

  return (
    <section className="flex justify-center items-center h-scren">
      <div className="container">
        <h1 className="text-4xl font-bold">{blog.title}</h1>
        <h1 className="text-4xl font-bold">{blog.slug}</h1>
        <h1 className="text-4xl font-bold">{blog.category}</h1>

        <img src={blog.thumbnail} alt="test" />
        <div
          className="prose-headings:font-title font-default prose mt-4 dark:prose-invert focus:outline-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </section>
  );
}
