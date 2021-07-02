import { open } from 'sqlite'
import { Database } from 'sqlite3'
import path from 'path'

const connection = () => open({
    filename: path.join(__dirname, 'rocket.q.sqlite'),
    driver: Database
  })

export default connection
