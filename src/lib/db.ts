import Database from 'better-sqlite3'

const db = new Database('stories.db')



db.prepare(`
  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY,
    title TEXT,
    by TEXT,
    score INTEGER,
    url TEXT
  )
`).run()


db.prepare(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    story_id INTEGER,
    text TEXT,
    by TEXT,
    time INTEGER
  )
`).run()

export default db
