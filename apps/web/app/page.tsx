"use client";

import {
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";

export default function Home() {
  async function refresh() {
    await fetch("/api/refresh", {
      method: "POST"
    });

    alert("Refresh started");
  }

  return (
    <main
      style={{
        padding: 24
      }}
    >
      <Typography variant="h3">
        WP Lead Radar
      </Typography>

      <Button
        variant="contained"
        onClick={refresh}
        sx={{ mt: 2 }}
      >
        Refresh
      </Button>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography>
            No leads yet.
          </Typography>
        </CardContent>
      </Card>
    </main>
  );
}