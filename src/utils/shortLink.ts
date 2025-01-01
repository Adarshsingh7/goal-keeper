const STORAGE_KEY = "goal_keeper_short_links";

export function generateShortLink(data: string): string {
  const id = Math.random().toString(36).substr(2, 6);
  const shortLinks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  shortLinks[id] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shortLinks));
  return id;
}

export function getDataFromShortLink(id: string): string | null {
  const shortLinks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  return shortLinks[id] || null;
}
