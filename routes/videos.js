const express = require('express');
const router = express.Router();
const videos = require('../data/videos.json');

router.get('/', (req, res) => {
	res.send(videos);
});

module.exports = router;