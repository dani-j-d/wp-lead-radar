export type RawLead = {
    title: string;
    url: string;
    snippet?: string;
    createdAt?: string;
    source: "reddit" | "facebook" | "forum" | "searxng";
  };