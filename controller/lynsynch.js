
const db = require('../config/connect');
const lynsynchmodel = require('../model/lynsynchmodel');

// Get all songs and render the homepage
exports.getSongs = (req, res) => {
    lynsynchmodel.getSongs((err, results) => {
        if (err) {
            console.error('Error fetching songs: ', err);
            return res.status(500).send('Error fetching songs');
        }
        // Render the index.ejs and pass the songs data to the template
        res.render('index', { 
            title: 'Audio Player Example', 
            tracks: results  // Pass the songs fetched from the database
        });
    });
};

// Show the form to upload a new song
exports.showUploadForm = (req, res) => {
    res.render('upload');  // Make sure you have this view in your views folder
};

// Add a new song
exports.addSong = (req, res) => {
    const songData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.files['image_cover'][0].path,  // Get cover image path
        file_path: req.files['songFile'][0].path  // Get song file path
    };

    lynsynchmodel.addSong(songData, (err, result) => {
        if (err) {
            console.error('Error adding song: ', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');  // Redirect to the home page after upload
    });
};

// Get a song by ID for editing
exports.getSongById = (req, res) => {
    const songId = req.params.id;

    lynsynchmodel.getSongById(songId, (err, result) => {
        if (err) {
            console.error('Error fetching song by ID: ', err);
            return res.status(500).send('Error fetching song by ID');
        }
        res.render('editForm', { song: result[0] });  // Render the edit form, passing the song data
    });
};

// Update an existing song
exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const { title, artist } = req.body; // Assuming you're not updating the file if it's not provided

    // Check if a new song file is being uploaded
    let songFilePath = null;
    if (req.file) {
        songFilePath = req.file.path; // Path to the new uploaded file
    }

    // Example query to update the song
    const query = 'UPDATE songs SET title = ?, artist = ?' + (songFilePath ? ', file_path = ?' : '') + ' WHERE id = ?';
    const values = songFilePath ? [title, artist, songFilePath, songId] : [title, artist, songId];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating song:', error);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/'); // Redirect after successful update
    });
};

// Delete a song
exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    // Assuming you have a function to execute a SQL query
    const query = 'DELETE FROM songs WHERE id = ?';

    db.query(query, [songId], (error, results) => {
        if (error) {
            console.error('Error deleting song:', error);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/'); // Redirect to the main page after deletion
    });
};
