const connect = require('../config/connect');

// Function to get all songs
exports.getSongs = (callback) => {
    const query = 'SELECT * FROM songs';  // Make sure the table name matches your database
    connect.query(query, callback);
};

// Function to add a new song
exports.addSong = (songData, callback) => {
    const query = 'INSERT INTO songs SET ?';  // Insert song data into the database
    connect.query(query, songData, callback);
};

// Function to get a song by ID
exports.getSongById = (songId, callback) => {
    const query = 'SELECT * FROM songs WHERE id = ?';
    connect.query(query, [songId], callback);
};

// Function to update a song by ID
exports.updateSong = (songId, updatedSongData, callback) => {
    const query = 'UPDATE songs SET ? WHERE id = ?';
    connect.query(query, [updatedSongData, songId], callback);
};

// Function to delete a song by ID
exports.deleteSong = (songId, callback) => {
    const query = 'DELETE FROM songs WHERE id = ?';
    connect.query(query, [songId], callback);
};
