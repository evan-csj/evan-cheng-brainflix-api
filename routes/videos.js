const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();
const lib = require('../lib');
const videos = require('../data/videos.json');
const videosFileName = 'videos.json';
const videoDetailsFileName = 'video-details.json';

router.get('/', (_req, res) => {
	res.send(videos);
});

router.post('/', (req, res) => {
	const newVideo = req.body;
	const newId = uuid();
	newVideo.id = newId;
	const newVideoDetails = {
		id: newId,
		title: req.body.title,
		channel: req.body.channel,
		image: req.body.image,
		description: req.body.description,
		views: 0,
		likes: 0,
		duraion: '4:58',
		timestamp: Date.now(),
		comments: [],
	};

	const videos = lib.readJSON(videosFileName);
	const videoDetails = lib.readJSON(videoDetailsFileName);
	videos.push(newVideo);
	videoDetails.push(newVideoDetails);
	lib.writeJSON(videosFileName, videos);
	lib.writeJSON(videoDetailsFileName, videoDetails);

	res.send(videos);
});

module.exports = router;
