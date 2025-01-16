// web3.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL (Web3)');
});

// Serve static files (like images, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file when the root URL is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API to fetch the latest user
app.get('/latest-user', (req, res) => {
  db.query('SELECT * FROM users ORDER BY id DESC LIMIT 1', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// Start the server on port 8080
app.listen(8080, () => console.log('Web3 running on port 8080'));
