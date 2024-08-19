# reddit-lite

RedditLite is a reddit clone that I am working on.

It is currently a WIP, but right now users can sign up, edit their profile in settings, and join/create/leave topics, and post in topics
Todo: comment and upvote system

How to install:

- Clone the repo
- Run `npm i`
- Setup Google Auth (OAuth client) and Supabase (free Postgres hosting)
- Setup enviroment variables for Google Auth and Supabase
- Run `npx prisma generate`
- Run `npm run dev`
