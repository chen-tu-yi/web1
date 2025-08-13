const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./feedbacks.db');

// Middleware
app.use(bodyParser.json());

// Initialize database table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// API to receive feedback
app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.run(
    `INSERT INTO feedbacks (name, email, message) VALUES (?, ?, ?)`,
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// API to fetch all feedbacks
app.get('/feedbacks', (req, res) => {
  db.all(`SELECT * FROM feedbacks ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json(rows);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
