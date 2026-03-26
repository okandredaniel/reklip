import { File, Paths } from "expo-file-system";

function getFile(key: string): File {
  return new File(Paths.document, `${key}.json`);
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const file = getFile(key);
    if (!file.exists) return fallback;
    const content = await file.text();
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson<T>(key: string, data: T): Promise<void> {
  try {
    const file = getFile(key);
    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    const buffer = await blob.arrayBuffer();
    const stream = file.writableStream();
    const writer = stream.getWriter();
    await writer.write(new Uint8Array(buffer));
    await writer.close();
  } catch (e) {
    console.warn(`Failed to write ${key}:`, e);
  }
}
