import connection from './connection'

const setup = async () => {
  const database = await connection()

  await database.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY,
    pass TEXT
    )
  `)

  await database.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      read INT,
      room INT
    )
  `)

  await database.close()
}

setup()
