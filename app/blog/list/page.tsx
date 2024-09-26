import { CardDemo } from "@/components/blog/list";
import prisma from "@/lib/prisma";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

  type CardProps = {
    id: string;
    title: string;
    content: string;
    thumbnail?: string | null;
    category: string;
    updatedAt: Date;
  };
export default async function Blogs() {
  const posts: CardProps[] = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts) {
    return <div>No posts found.</div>;
  }
  return (
    <main>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl  bg-muted/50 p-4 lg:col-span-2">
        <div className="relative overflow-hidden rounded-lg bg-muted/50 h-full">
          <div className="flex gap-4 flex-wrap">
            {posts.map((post) => (
              <CardDemo
                key={post.id}
                {...post}
                className="focus-within:border focus-within:border-primary hover:border hover:border-primary hover:cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
