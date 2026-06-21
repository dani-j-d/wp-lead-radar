export async function searchSearxng(query: string): Promise<string[]> {
    const endpoint = "https://searx.be/search";
  
    const url = new URL(endpoint);
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
  
    try {
      const res = await fetch(url.toString(), {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });
  
      if (!res.ok) {
        console.log("SearXNG error:", await res.text());
        return [];
      }
  
      const data = await res.json();
  
      const results = data?.results ?? [];
  
      return results
        .map((r: any) => r.url)
        .filter(Boolean);
  
    } catch (err) {
      console.log("SearXNG fetch failed:", err);
      return [];
    }
  }