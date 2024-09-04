import Link from "next/link";
import prisma from "@/lib/prisma";

import { Bird, CornerDownLeft, Rabbit, Turtle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CardDemo } from "@/components/blog/list";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";



export default async function Blogs() {
  const posts = await prisma.post.findMany({
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
          <CardDemo
            className="focus-within:border focus-within:border-primary hover:border hover:border-primary hover:cursor-pointer"
          />
        </div>
      </div>
    </main>
    // <section className="py-24">
    //   <div className="container">
    //     <h1 className="text-3xl font-bold">Blogs</h1>
    //     <ul className="mt-6 flex flex-col gap-2">
    //       {posts.map((post) => (
    //         <li key={post.id}>
    //           <Link href={`/blog/${post.slug}`}>{post.title}</Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </section>
  );
}
