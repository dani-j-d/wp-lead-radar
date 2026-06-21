#!/bin/bash

echo "🧹 Cleaning Next build cache..."
rm -rf apps/web/.next

echo "🧹 Resetting SQLite DB..."
rm -f lead-radar.db

echo "📦 Installing dependencies (safe)..."
pnpm install

echo "🚀 Starting dev server..."
pnpm --filter web dev