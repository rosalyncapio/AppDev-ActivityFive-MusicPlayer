
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
    const updatedSongData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.body.image_path,  // This should be handled similarly for edit functionality
        file_path: req.file ? req.file.path : req.body.file_path  // Use new file if uploaded
    };

    lynsynchmodel.updateSong(songId, updatedSongData, (err, result) => {
        if (err) {
            console.error('Error updating song: ', err);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/');
    });
};

// Delete a song
exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    lynsynchmodel.deleteSong(songId, (err, result) => {
        if (err) {
            console.error('Error deleting song: ', err);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/');
    });
};
