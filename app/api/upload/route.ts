import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response(
      "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
      {
        status: 401,
      }
    );
  }

  const file = req.body || "";
  const filename = req.headers.get("x-vercel-filename") || "file.txt";
  const contentType = req.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType)
    ? filename
    : `${filename}${fileType}`;
  const blob = await put(finalName, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}

export async function DELETE(request: Request) {
  try {
    // Parse the incoming request
    const { blobUrl } = await request.json();
    console.log("Received blob URL:", blobUrl);

    if (!blobUrl) {
      return new Response("No blob URL provided.", { status: 400 });
    }

    // Call the del function to delete the file
    await del(blobUrl);

    return new Response("File deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response("Error deleting file.", { status: 500 });
  }
}
