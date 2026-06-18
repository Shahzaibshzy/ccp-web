const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        quantity INTEGER NOT NULL DEFAULT 0,
        price REAL NOT NULL DEFAULT 0,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const adminEmail = 'admin@inventory.local';
    db.get('SELECT id FROM users WHERE email = ?', [adminEmail], (err, row) => {
      if (!row) {
        const adminPassword = bcrypt.hashSync('Admin123!', 10);
        db.run(
          'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
          ['admin', adminEmail, adminPassword]
        );
      }
    });
  });
}

module.exports = {
  db,
  initializeDatabase,
};
