// web1.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like CSS or JS
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL (Web1)');
});

// Serve the registration page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle registration form submission
app.post('/add-user', (req, res) => {
  const { username, password } = req.body;

  // Insert user data into the database
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
    if (err) return res.status(500).send(err);
    
    // After successful registration, redirect to Web3
    res.redirect('http://localhost:8083/#');
  });
});

// Start server
app.listen(8080, () => console.log('Web1 running on port 8080'));
