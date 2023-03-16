const express = require('express');
const router = express.Router();
const videoDetails = require('../data/video-details.json');

router.get('/:videoId', (req, res) => {
	const videoId = req.params.videoId;
	const videoDetail = videoDetails.find(video => video.id === videoId);
	res.send(videoDetail);
});

module.exports = router;