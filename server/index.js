const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Use an in-memory SQLite database for local development

db.serialize(() => {
    db.run('CREATE TABLE game_sessions (gameId INTEGER PRIMARY KEY, game_name TEXT, user_name TEXT)');
  });

const app = express();
app.use(cors());
app.use(express.json());

function fetchAllGameSessions() {
    db.all('SELECT * FROM game_sessions', [], (err, rows) => {
        if (err) {
        throw err;
        }
        // rows contains an array of objects representing the gameSessions
        console.log(rows);
    });
}

app.get('/api/gameSessions', (req, res) => {
    db.all('SELECT * FROM game_sessions', (err, rows) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch game sessions' });
        } else {
          res.json(rows);
        }
      });
});

app.post('/api/gameSessions', (req, res) => {
    const { gameName, userName } = req.body;
    const stmt = db.prepare('INSERT INTO game_sessions (game_name, user_name) VALUES (?, ?)');
    stmt.run(gameName, userName, function(err) {
        if (err) {
            res.status(500).json({ error: 'Failed to save game session' });
        } else {
            const gameId = this.lastID;
            res.json({ status: 'success', gameId: gameId });
            fetchAllGameSessions()
        }
    });
    stmt.finalize();
});

app.get('/api/game/:gameId/players', (req, res) => {
    // Fetch players from the database for the specific gameId
    const gameId = req.params.gameId;
    db.all('SELECT * FROM game_sessions WHERE gameId = ?', [gameId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch players for the specific game' });
      } else {
        res.json(rows);
      }
    });
  });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});