const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export async function getBlobFile(filepath: string) {
  const endpoint = `${BACKEND_HOST}/${filepath}`;
  const res = await fetch(endpoint);
  return res;
}

export function getBlobUrl(filePath: string) {
  return `${BACKEND_HOST}${filePath}`;
}
