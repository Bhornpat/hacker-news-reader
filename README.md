## Hacker News Top 10 Stories
----

This is a Hacker News web app built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **SQLite (via better-sqlite3)**. It fetches the top 10 stories from the Hacker News API, stores them locally, and displays them in a clean, and deploy to Vercal.

----

### Setup Instructions

1. **Clone the repository**

```
git clone https://github.com/Bhornpat/hacker-news-reader.git
cd hacker-news-reader
```

2. **Install dependencies**

```
npm install
```

3. **Run the development server**

```
npm run dev
```
----

### Local Database

- The app uses better-sqlite3 to cache stories in a local stories.db file
- The database is initialized on first load with stories tables
- Duplicate requests for the same story ID will return cached results



