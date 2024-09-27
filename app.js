const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const app = express();
const db = require('./config/connect'); // Adjust the path based on your directory structure
const PORT = process.env.PORT || 3003;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded songs from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to update a song
// Route to update a song
// Example for updating a song
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.post('/index/:id', (req, res) => {
    const songId = req.params.id;
    const title = req.body.title;
    const artist = req.body.artist;

    // Validate input data
    if (typeof title !== 'string' || typeof artist !== 'string' || !songId) {
        return res.status(400).send('Invalid input data');
    }

    // Log the values to check
    console.log('Updating song with ID:', songId, 'Title:', title, 'Artist:', artist);

    // SQL Update query
    const sql = 'UPDATE songs SET title = ?, artist = ? WHERE id = ?';
    db.query(sql, [title, artist, songId], (err, results) => {
        if (err) {
            console.error('Error updating song:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({ message: 'Song updated successfully!' });
    });
});



// Use the router for handling song-related routes
app.use('/', router);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong! Please try again later.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
