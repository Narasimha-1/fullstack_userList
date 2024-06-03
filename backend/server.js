const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors()); // Use the cors middleware

const db = new sqlite3.Database('./database/data.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    dob TEXT,
    contactNumber TEXT,
    email TEXT,
    description TEXT
  )`);
});

app.post('/api/users', (req, res) => {
  const { name, dob, contactNumber, email, description } = req.body;
  db.run(`INSERT INTO users (name, dob, contactNumber, email, description) VALUES (?, ?, ?, ?, ?)`,
    [name, dob, contactNumber, email, description],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get('/api/users', (req, res) => {
  db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.delete('/api/users', (req, res) => {
  db.run(`DELETE FROM users`, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'All users deleted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
