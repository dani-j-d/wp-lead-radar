import { RawLead } from "../types";

async function fakeSearch(query: string): Promise<RawLead[]> {
  const url = `https://www.facebook.com/search/posts/?q=${encodeURIComponent(query)}`;

  // NOTE: This returns URL only (Facebook blocks scraping content)
  return [
    {
      title: `Facebook search: ${query}`,
      url,
      snippet: "User-generated posts (requires manual opening)",
      createdAt: new Date().toISOString(),
      source: "facebook"
    }
  ];
}

export const facebookSource = {
  name: "facebook",
  async fetch(): Promise<RawLead[]> {
    const queries = [
      "wordpress help",
      "my website is down",
      "need website fix"
    ];

    const results = await Promise.all(queries.map(fakeSearch));
    return results.flat();
  }
};