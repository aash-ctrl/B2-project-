const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// CRUD Endpoints
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/cars/:id', (req, res) => {
  db.get('SELECT * FROM cars WHERE id=?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Car not found' });
    res.json(row);
  });
});

app.post('/cars', (req, res) => {
  const { name, type, price_per_day } = req.body;
  db.run('INSERT INTO cars(name,type,price_per_day) VALUES(?,?,?)',
    [name, type, price_per_day], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

app.put('/cars/:id', (req, res) => {
  const { name, type, price_per_day } = req.body;
  db.run('UPDATE cars SET name=?, type=?, price_per_day=? WHERE id=?',
    [name, type, price_per_day, req.params.id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes });
    });
});

app.delete('/cars/:id', (req, res) => {
  db.run('DELETE FROM cars WHERE id=?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('WeAreCars API running. Use /cars endpoint.');
});

app.listen(port, () => console.log(`API running at http://localhost:${port}`));