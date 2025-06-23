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


export default db
