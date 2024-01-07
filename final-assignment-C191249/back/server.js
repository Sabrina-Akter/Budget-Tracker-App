// server.js
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());

// API endpoint for creating an entry
app.post('/api/entries', async (req, res) => {
  try {
    const { title, value, type, category } = req.body;

    // Use parameterized query to prevent SQL injection
    const query = 'INSERT INTO entries(title, value, type, category) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [title, value, type, category];

    // Execute the query
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


