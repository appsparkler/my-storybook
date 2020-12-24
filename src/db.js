import Dexie from 'dexie'

const db = new Dexie('MyDb');

db.version(2)
  .stores({
    punchCards: "++id",
    users: "++email"
  });

db.open()

export default db;
