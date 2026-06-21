"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

type Lead = {
  id?: number;
  domain?: string;
  issue_type?: string;
  severity?: string;
  summary?: string;
  suggested_fix?: string;
  discovered_at?: string;
  title?: string;
  url?: string;
  snippet?: string;
  score?: number;
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function loadLeads() {
    const res = await fetch("/api/leads", { cache: "no-store" });
    const data = await res.json();

    // FIX: API returns { ok, leads }
    setLeads(data.leads ?? []);
  }

  async function refresh() {
    const res = await fetch("/api/refresh", { method: "POST" });
    const data = await res.json();

    console.log("REFRESH RESULT:", data);

    // FIX: refresh also returns { ok, leads }
    setLeads(data.leads ?? []);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <Typography variant="h3">WP Lead Radar</Typography>

      <Button variant="contained" onClick={refresh} sx={{ mt: 2 }}>
        Refresh
      </Button>

      <div style={{ marginTop: 24 }}>
        {leads.length === 0 ? (
          <Card>
            <CardContent>
              <Typography>No leads yet.</Typography>
            </CardContent>
          </Card>
        ) : (
          leads.map((lead, i) => (
            <Card key={lead.id ?? i} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {lead.domain || lead.title || lead.url}
                </Typography>

                {lead.issue_type && (
                  <Typography>{lead.issue_type}</Typography>
                )}

                {lead.summary && (
                  <Typography variant="body2">{lead.summary}</Typography>
                )}

                {lead.snippet && (
                  <Typography variant="body2">{lead.snippet}</Typography>
                )}

                {lead.url && (
                  <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    {lead.url}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}