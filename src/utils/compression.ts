import pako from "pako";

export function compressData(data: string): string {
  const compressed = pako.deflate(new TextEncoder().encode(data));
  return btoa(String.fromCharCode.apply(null, Array.from(compressed)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function decompressData(compressed: string): string {
  const data = atob(compressed.replace(/-/g, "+").replace(/_/g, "/"));
  const charData = data.split("").map((x) => x.charCodeAt(0));
  const inflated = pako.inflate(new Uint8Array(charData));
  return new TextDecoder().decode(inflated);
}
