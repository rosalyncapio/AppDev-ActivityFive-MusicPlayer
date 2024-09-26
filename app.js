const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from public folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded songs

app.use('/', router);  // Use the song routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
