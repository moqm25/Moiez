const express = require('express');
const mysql = require('mysql');
const cors = require("cors");             // Enable Cross-Origin Resource Sharing


const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

// Create a MySQL connection pool
// const db = mysql.createPool({
//   connectionLimit: 10,
//   host: "wes-test-1.cjcmg2sim4qv.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "test123123",
//   database: "snake_game"
// });

const db = mysql.createConnection({
    host: "wes-test-1.cjcmg2sim4qv.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "test123123",
    database: "snake_game",
});

db.connect((err) => {
	if (err) {
		console.error("Error connecting to the database:", err);
		// Exit process if connection fails to prevent further issues
		process.exit(1);
	} else {
		console.log("Connected to database");
	}
});

// GET endpoint to retrieve the top 10 leaderboard entries
app.get('/leaderboard', (req, res) => {
    const query = 'SELECT * FROM leaderboard ORDER BY score DESC, created_at ASC LIMIT 10';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching leaderboard:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// POST endpoint to add a new score to the leaderboard
app.post('/leaderboard', (req, res) => {
    const { name, score } = req.body;
    if (!name || typeof score === 'undefined') {
        return res.status(400).json({ error: 'Missing name or score' });
    }
    const query = 'INSERT INTO leaderboard (name, score) VALUES (?, ?)';
    db.query(query, [name, score], (error, result) => {
        if (error) {
            console.error('Error inserting leaderboard entry:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Score saved successfully', id: result.insertId });
        console.error('Added:', name, score);
    });
});

// Optionally, you can serve static files if needed (e.g., if you store your HTML/JS on the same server)
// app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});