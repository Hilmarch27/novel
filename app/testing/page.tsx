'use client'
import { ImageUpload } from '@/components/custom/image-upload';
import React, { useState } from 'react'
import {FloatingLabelInput} from '@/components/custom/floating-input';

const Page = () => {
  const [title, setTitle] = useState("");
  console.log('title:', title)

  return (
    <div className="container flex juctify-center items-center mx-auto">
      <ImageUpload />
      <FloatingLabelInput
        label="Label"
        id="label"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default Page