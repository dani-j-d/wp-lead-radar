import { RawLead } from "../types";

async function search(q: string): Promise<RawLead[]> {
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    q + " site:wordpress.org OR site:stackoverflow.com"
  )}`;

  return [
    {
      title: `Forum search: ${q}`,
      url,
      snippet: "Forum/StackOverflow results",
      createdAt: new Date().toISOString(),
      source: "forum"
    }
  ];
}

export const forumSource = {
  name: "forums",
  async fetch(): Promise<RawLead[]> {
    const queries = [
      "wordpress critical error",
      "site not working wordpress",
      "database connection error wordpress"
    ];

    const results = await Promise.all(queries.map(search));
    return results.flat();
  }
};