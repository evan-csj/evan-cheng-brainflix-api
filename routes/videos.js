const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();
const videos = require('../data/videos.json');
const videosFileName = 'videos.json';
const videoDetailsFileName = 'video-details.json';

router.get('/', (_req, res) => {
	res.send(videos);
});

router.post('/', (req, res) => {
	// const newVideo = req.body;
	// const newVideoDetails = req.body;
	// const newId = uuid();
	// newVideo.id = newId;
	// newVideoDetails.id = newId;
	// newVideoDetail
});

module.exports = router;
