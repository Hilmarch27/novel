"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, X } from "lucide-react";
import Image from "next/image";
import useGlobalStore from "@/zustand/global-store";

export function ImageUpload({}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null); // URL of the uploaded image
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setData = useGlobalStore((state) => state.setData);
  // Function to handle file upload to your API route
  const uploadImage = async (file: File) => {
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "content-type": file?.type || "application/octet-stream",
        "x-vercel-filename": file?.name || "image.png",
      },
      body: file,
    });

    if (res.status === 200) {
      const { url } = await res.json();
      setThumbnail(url); // Store URL in the state
      setData?.(url);
      return url;
    } else {
      console.error("Failed to upload image.");
      return null;
    }
  };

  const deleteImage = async (imgUrl: string) => {
    const res = await fetch("/api/upload", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blobUrl: imgUrl, // Use the actual thumbnail URL
      }),
    });

    if (res.ok) {
      console.log("Image deleted successfully");
    } else {
      console.error("Error deleting the image");
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string); // Preview the image
    };
    reader.readAsDataURL(file);
    setFileName(file.name);

    // Upload the image to the server
    uploadImage(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    } else {
      setPreview(null);
      setFileName(null);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePreview = () => {
    if (thumbnail) {
      deleteImage(thumbnail); // Call deleteImage with the correct URL
    }
    setPreview(null);
    setFileName(null);
    setThumbnail(null); // Reset the thumbnail URL
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`mt-1 lg:h-[480px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors ${
        isDragging ? "border-primary bg-purple-100" : "border-purple-300"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        ref={fileInputRef}
        aria-describedby="file-upload-description"
      />
      {!preview ? (
        <>
          <UploadIcon className="w-12 h-12 text-primary mb-4" />
          <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-purple-600 hover:bg-purple-700 focus:ring-primary mb-2"
          >
            Choose file
          </Button>
          <p className="text-sm text-purple-600" id="file-upload-description">
            or drag and drop your image here
          </p>
        </>
      ) : (
        <div className="w-full">
          <div className="relative">
            <Image
              src={preview}
              layout="responsive"
              width={250}
              height={250}
              alt="Preview"
              className="object-cover rounded-lg max-w-[700px] max-h-[350px]"
            />
            <Button
              type="button"
              onClick={handleDeletePreview}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 focus:ring-red-400 rounded-full px-3 py-0"
              aria-label="Delete preview"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          {fileName && (
            <p className="mt-2 text-sm text-purple-600 text-center">
              File: {fileName}
            </p>
          )}
          <Button
            type="button"
            onClick={handleButtonClick}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 focus:ring-primary"
          >
            Choose another file
          </Button>
        </div>
      )}
    </div>
  );
}
