import { NextResponse } from "next/server";

import { uploadToBlob } from "@/lib/blob";

/**
 * POST /api/blob/upload
 * Upload one file to Vercel Blob (for admin/scripts; protect in production if needed).
 * Form field: "file" (required), optional "pathname" (defaults to filename).
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Missing file in form data (field name: file)." },
        { status: 400 }
      );
    }

    const pathname =
      (formData.get("pathname") as string | null) ||
      (file instanceof File ? file.name : "upload.bin");

    const result = await uploadToBlob(pathname, file);

    return NextResponse.json({
      url: result.url,
      pathname: result.pathname,
      downloadUrl: result.downloadUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
