"use client";

import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

type Lead = {
  id: number;
  domain: string;
  issue_type: string;
  severity: string;
  summary: string;
  suggested_fix: string;
  discovered_at: string;
};

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function loadLeads() {
    const res = await fetch("/api/leads", {
      cache: "no-store",
    });

    const data = await res.json();
    setLeads(data);
  }

  async function refresh() {
    await fetch("/api/refresh", { method: "POST" });
    await loadLeads();
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
          leads.map((lead) => (
            <Card key={lead.id} sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6">{lead.domain}</Typography>
                <Typography>{lead.issue_type}</Typography>
                <Typography variant="body2">
                  {lead.summary}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {lead.suggested_fix}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}