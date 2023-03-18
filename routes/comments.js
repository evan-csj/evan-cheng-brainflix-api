const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const express = require('express');
const lib = require('../lib');
const router = express.Router();
const videoDetailsFileName = 'video-details.json';

router.post('/:videoId/comments', (req, res) => {
	const videoId = req.params.videoId;
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	newComment.id = uuid();

	const videoDetails = lib.readJSON(videoDetailsFileName);
	const videoDetailsChanged = videoDetails.find(
		video => video.id === videoId
	);

	videoDetailsChanged.comments.push(newComment);

	lib.writeJSON(videoDetailsFileName, videoDetails);

	res.send(newComment);
});

router.delete('/:videoId/comments/:commentId', (req, res) => {
	const videoId = req.params.videoId;
	const commentId = req.params.commentId;

	const videoDetails = lib.readJSON(videoDetailsFileName);
	const videoDetailsChanged = videoDetails.find(
		video => video.id === videoId
	);

	const index = videoDetailsChanged.comments.findIndex(
		comment => comment.id === commentId
	);

	if (index === -1) {
		return res
			.status(500)
			.send(JSON.stringify({ message: 'ERROR: COMMENT NOT EXISTING' }));
	} else {
		videoDetailsChanged.comments.splice(index, 1);
	}

	lib.writeJSON(videoDetailsFileName, videoDetails);

	const deleteComment = req.body;
	res.send(deleteComment);
});

module.exports = router;
