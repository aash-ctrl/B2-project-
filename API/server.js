const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

// Open or create database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to database');
  }
});

// Create cars table if not exists
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price_per_day REAL NOT NULL
  )`, (err) => {
    if (err) console.error('Table creation error:', err.message);
    else console.log('Cars table ready');

    // Check if table is empty
    db.get('SELECT COUNT(*) as count FROM cars', (err, row) => {
      if (err) console.error(err.message);
      else if (row.count === 0) {
        console.log('Inserting 20+ sample cars...');
        const cars = [
          ['Honda Civic','City',25],
          ['Toyota Corolla','City',27],
          ['Ford Focus','City',26],
          ['Volkswagen Golf','City',28],
          ['BMW 3 Series','Family',50],
          ['Audi A4','Family',55],
          ['Mercedes C-Class','Family',60],
          ['Tesla Model 3','Electric',80],
          ['Nissan Leaf','Electric',65],
          ['Kia Sportage','SUV',70],
          ['Toyota RAV4','SUV',68],
          ['Ford Explorer','SUV',75],
          ['Porsche 911','Sports',120],
          ['Chevrolet Corvette','Sports',110],
          ['Jaguar F-Type','Sports',115],
          ['Hyundai Ioniq','Hybrid',45],
          ['Toyota Prius','Hybrid',50],
          ['Ford Mustang','Sports',105],
          ['Volkswagen Tiguan','SUV',65],
          ['Honda Accord','Family',52]
        ];
        const stmt = db.prepare('INSERT INTO cars(name,type,price_per_day) VALUES (?,?,?)');
        for (const car of cars) stmt.run(car);
        stmt.finalize();
        console.log('Sample cars inserted successfully');
      }
    });
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('API running successfully! Visit /cars to see the data.');
});

// GET all cars
app.get('/cars', (req, res) => {
  db.all('SELECT * FROM cars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Start server
app.listen(port, () => console.log(`API running successfully at http://localhost:${port}`));