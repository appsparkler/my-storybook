import Dexie from 'dexie'

const db = new Dexie('MyDb');

db.version(1)
  .stores({
    punchCard: "++id,slots,goalOfTheDay"
  })

db.open()

export default db;
