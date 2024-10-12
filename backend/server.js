// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Create Employee (POST)
app.post('/api/employees', (req, res) => {
  const { name, position, department, salary } = req.body;
  const query = 'INSERT INTO employees (name, position, department, salary) VALUES (?, ?, ?, ?)';
  db.query(query, [name, position, department, salary], (err, result) => {
    if (err) throw err;
    res.send('Employee added');
  });
});

// Get All Employees (GET)
app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get Employee by ID (GET)
app.get('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM employees WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Update Employee (PUT)
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department, salary } = req.body;
  const query = 'UPDATE employees SET name = ?, position = ?, department = ?, salary = ? WHERE id = ?';
  db.query(query, [name, position, department, salary, id], (err, result) => {
    if (err) throw err;
    res.send('Employee updated');
  });
});

// Delete Employee (DELETE)
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send('Employee deleted');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
