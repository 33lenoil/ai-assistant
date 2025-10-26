// Environment-specific constants
export const VERCEL_BLOB_BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_BLOB_BASE_URL ||
  "https://yuhyk3zjlcchwpep.public.blob.vercel-storage.com";

// Helper function to construct blob URLs
export const getBlobUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${VERCEL_BLOB_BASE_URL}/${cleanPath}`;
};
