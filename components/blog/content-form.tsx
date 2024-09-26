'use client'

import { useEffect, useState } from 'react'
import { createBlogAction } from '@/lib/action/blog-actions'
import { toast } from 'sonner'

import Editor from '@/components/editor/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useGlobalStore from '@/zustand/global-store'

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

interface ContentFormProps {
  onSubmit: () => void;
  isPending: boolean;
}

export default function ContentForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  console.log("slug:", slug);
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [pending, setPending] = useState(false);
  const data = useGlobalStore((state) => state.data);


  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setSlug(name);
    console.log("Slug updated:", name); // Log slug untuk debugging
  }, [title]);

  async function handleSubmit() {
    // TODO: validate the data

    setPending(true);

    const result = await createBlogAction({ title, slug, content, category, thumbnail: data });
    console.log("result:", result);
    if (result?.error) {
      toast.error(result.error);
    }

    setPending(false);
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-4 px-2 h-full">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Slug"
          value={slug}
          readOnly
          onChange={(e) => setSlug(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button className="mb-10" onClick={handleSubmit} disabled={pending}>
        {pending ? "Submitting..." : "Create"}
      </Button>
    </div>
  );
}
