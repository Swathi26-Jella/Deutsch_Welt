DeutschWelt – Supabase Content-Driven

Architecture

GitHub stores only the website code.
Supabase stores the learning content.

Normal future content additions do NOT require editing or adding code in GitHub.

Included

Startseite

Lernwelten

A1

A2

B1

Wortschatz

Grammatik

No Über uns

No quizzes/exercises/scores

Setup

Open Supabase → SQL Editor.

Paste and run supabase.sql.

Open script.js.

Replace:
SUPABASE_URL
SUPABASE_ANON_KEY

Use the public anon/publishable key only. Never put a service_role key in GitHub.

Upload these files to GitHub root and enable GitHub Pages.

Add future content in Supabase

New topic

Supabase → Table Editor → topics → Insert row.

Use:

level: A1 / A2 / B1

category

title

summary

explanation

key_points JSON array

sentence_patterns JSON array

examples JSON array

merke

icon

image_url

sort_order

published

Save. The website reads it automatically.

New grammar

Insert a row into grammar_topics with the same style of content fields.

New vocabulary

Insert a row into vocabulary:

level

category

word

article

plural

meaning

example

note

image_url

sort_order

published

Images

The topic and grammar tables include image_url.
Later, you can store images in Supabase Storage and paste the public URL into that row.

Adding B2 later

The current database is intentionally A1/A2/B1 only. When you are ready for B2, the schema/template can be extended. Normal B2 content can then be managed in Supabase.
