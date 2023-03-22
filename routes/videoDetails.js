const express = require('express');
const router = express.Router();
const commentsRoute = require('./comments');
const videosJSON = require('../data/videos.json');
const lib = require('../lib');
const videosFileName = 'videos.json';
const errorMsg = { message: 'No video with that id exists' };

router.get('/:videoId', (req, res) => {
	const videoId = req.params.videoId;
	const video = videosJSON.find(video => video.id === videoId);
	if (video !== undefined) {
		res.send(video);
	} else {
		res.status(404).send(JSON.stringify(errorMsg));
	}
});

router.put('/:videoId/likes', (req, res) => {
	const videos = lib.readJSON(videosFileName);
	const videoId = req.params.videoId;
	const video = videos.find(video => video.id === videoId);
	if (video !== undefined) {
		const n = Number(video.likes.replace(',','')) + 1;
		video.likes = n.toLocaleString();
		lib.writeJSON(videosFileName, videos);
		res.send(video);
	} else {
		res.status(404).send(JSON.stringify(errorMsg));
	}
});

router.use(
	'/:videoId/comments',
	(req, res, next) => {
		const videoId = req.params.videoId;
		const index = videos.findIndex(video => video.id === videoId);
		if (index === -1) {
			return res.status(404).send();
		}
		req.videoId = videoId;
		next();
	},
	commentsRoute
);

module.exports = router;
