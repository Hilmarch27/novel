"use server";

import prisma from "../prisma";
import { redirect } from "next/navigation";

export async function createBlogAction(data: {
  title: string;
  slug: string;
  content: string;
  category: string;
  thumbnail: string | null;
}) {
  // TODO: validate the data

  let post;

  try {
    post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        category: data.category,
        thumbnail: data.thumbnail
      },
    });

    if (!post) {
      return { error: "Failed to create the blog." };
    }
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "That slug already exists." };
    }

    return { error: error.message || "Failed to create the blog." };
  }

  redirect(`/blog/${post.slug}`);
}
