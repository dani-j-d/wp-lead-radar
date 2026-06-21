import { request } from "undici";
import { RawLead } from "../types";

type RedditAPIResponse = {
    data?: {
      children?: any[];
    };
  };

async function search(q: string): Promise<RawLead[]> {
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(q)}&sort=new&limit=10`;

  const res = await request(url, {
    headers: { "User-Agent": "lead-radar" }
  });

  const text = await res.body.text();

  if (!text || text.trim().startsWith("<")) {
    return []; // Reddit blocked or returned HTML
  }
  
  const data = JSON.parse(text) as RedditAPIResponse;
  
return (data?.data?.children ?? []).map((p: any) => ({
    title: p.data.title,
    url: "https://reddit.com" + p.data.permalink,
    snippet: p.data.selftext,
    createdAt: new Date(p.data.created_utc * 1000).toISOString(),
    source: "reddit"
  }));
}

export const redditSource = {
  name: "reddit",
  async fetch(): Promise<RawLead[]> {
    const queries = [
      "wordpress help",
      "website down",
      "site broken",
      "critical error wordpress"
    ];

    const results = await Promise.all(queries.map(search));
    return results.flat();
  }
};