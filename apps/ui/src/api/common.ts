const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:8000";

export async function getBlobFile(
  filepath: string,
): Promise<Response | undefined> {
  try {
    const endpoint = `${BACKEND_HOST}/${filepath}`;
    const res = await fetch(endpoint);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export function getBlobUrl(filePath: string) {
  return `${BACKEND_HOST}${filePath}`;
}
