const { v4: uuid } = require('uuid');
const express = require('express');
const lib = require('../lib');
const router = express.Router();
const videosFileName = 'videos.json';

router.post('/', (req, res) => {
	const videoId = req.videoId;
	const newComment = {
		id: uuid(),
		name: req.body.name,
		comment: req.body.comment,
		likes: 0,
		timestamp: Date.now(),
	};

	const videos = lib.readJSON(videosFileName);
	const videoDetailsChanged = videos.find(video => video.id === videoId);

	videoDetailsChanged.comments.push(newComment);

	lib.writeJSON(videosFileName, videos);

	res.send(newComment);
});

router.delete('/:commentId', (req, res) => {
	const videoId = req.videoId;
	const commentId = req.params.commentId;
	const deleteComment = req.body;
	const videos = lib.readJSON(videosFileName);
	const videoDetailsChanged = videos.find(video => video.id === videoId);

	const index = videoDetailsChanged.comments.findIndex(
		comment => comment.id === commentId
	);

	if (index === -1) {
		return res.status(404).send(JSON.stringify());
	} else {
		res.send(deleteComment);
		videoDetailsChanged.comments.splice(index, 1);
	}

	lib.writeJSON(videosFileName, videos);
});

module.exports = router;
