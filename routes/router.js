const express = require('express');
const router = express.Router();
const lynsynch = require('../controller/lynsynch');
const multer = require('multer');
const path = require('path');

// Multer storage setup for handling file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Create unique filenames
    },
});

const upload = multer({ storage });

// Routes
router.get('/', lynsynch.getSongs);  // Get all songs
router.get('/upload', lynsynch.showUploadForm);  // Show upload form

// Update route to handle both the image and song file uploads
router.post('/upload', upload.fields([{ name: 'image_cover', maxCount: 1 }, { name: 'songFile', maxCount: 1 }]), lynsynch.addSong);

// Ensure the following line is correct
router.post('/edit/:id', upload.single('songFile'), lynsynch.updateSong);  
router.post('/delete/:id', lynsynch.deleteSong);  
// router.post('/playlist/create', lynsynch.playlist);  
// router.post('/playlist/addsong', lynsynch.playlistSongs);  

module.exports = router;
