const express = require('express');
const router = express.Router();
const commentsRoute = require('./comments');
const videos = require('../data/videos.json');
const errorMsg = { message: 'No video with that id exists' };

router.get('/:videoId', (req, res) => {
	const videoId = req.params.videoId;
	const video = videos.find(video => video.id === videoId);
	if (video !== undefined) {
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
