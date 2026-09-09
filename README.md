DeutschWelt – Starter Website

DeutschWelt is a responsive German-learning website starter for A1–B2.

Files

index.html – website structure

style.css – responsive design

script.js – lessons, filters, mini quizzes, vocabulary, optional Supabase loading

supabase.sql – database schema, Row Level Security policies and starter content

Run locally

Open index.html in a browser. The site works with built-in fallback data even before Supabase is connected.

Connect Supabase

Create a Supabase project.

Open SQL Editor.

Run all of supabase.sql.

In script.js, set:

const SUPABASE_URL = "https://YOUR-PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR-ANON-KEY";

Use the anon/publishable client key, not a service-role key.

The frontend only reads published/public learning content. Keep private/admin functionality for a later authenticated admin area.

Publish with GitHub Pages

Upload index.html, style.css and script.js to a GitHub repository. Enable GitHub Pages for the repository.

Publish with Vercel

Import the repository into Vercel. No build step is required for this plain HTML/CSS/JS starter.
