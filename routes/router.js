const express = require('express');

const router = express.Router();
const lynsynch = require('../controller/lynsynch'); // Only need this line once

router.get('/', lynsynch.home);
router.get('/lynsynch/music', lynsynch.music);



module.exports = router;
