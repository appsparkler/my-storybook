import Dexie from 'dexie'

const db = new Dexie('MyDb')

db.version(1).stores({
  punchCards: '++id',
})

db.open()

export default db
