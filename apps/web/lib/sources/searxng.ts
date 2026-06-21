import { RawLead } from "../types";

const SEARX_URL = "https://searx.be/search";

async function search(q: string): Promise<RawLead[]> {
  try {
    const res = await fetch(`${SEARX_URL}?q=${encodeURIComponent(q)}&format=json`);
    const data = await res.json();

    return (data?.results ?? []).map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.content,
      createdAt: new Date().toISOString(),
      source: "searxng"
    }));
  } catch {
    return [];
  }
}

export const searxngSource = {
  name: "searxng",
  async fetch(): Promise<RawLead[]> {
    const queries = [
      "wordpress site broken",
      "critical error website",
      "website down support needed"
    ];

    const results = await Promise.all(queries.map(search));
    return results.flat();
  }
};