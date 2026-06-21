import { fetch } from "undici";
import * as cheerio from "cheerio";

export async function searchDuckDuckGo(query: string) {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  const results: string[] = [];

  $("a.result__a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("http")) {
      results.push(href);
    }
  });

  return results.slice(0, 10);
}