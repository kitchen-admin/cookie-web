import { put, type PutBlobResult } from "@vercel/blob";

/**
 * Upload a file to Vercel Blob (server-side only).
 * Requires BLOB_READ_WRITE_TOKEN in the environment.
 */
export async function uploadToBlob(
  pathname: string,
  body: Blob | ArrayBuffer | Buffer | File,
  options?: { access?: "public" }
): Promise<PutBlobResult> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is missing. Add it from the Vercel dashboard → Storage → Blob."
    );
  }

  return put(pathname, body, {
    access: options?.access ?? "public",
    token,
  });
}
