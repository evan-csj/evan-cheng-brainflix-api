const { v4: uuid } = require('uuid');
const express = require('express');
const lib = require('../lib');
const router = express.Router();
const videoDetailsFileName = 'video-details.json';
const deleteMsgErr = {
	message: 'ERROR: COMMENT NOT EXISTING',
};

router.post('/', (req, res) => {
	const videoId = req.videoId;
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

router.delete('/:commentId', (req, res) => {
	const videoId = req.videoId;
	const commentId = req.params.commentId;
	const deleteComment = req.body;
	const videoDetails = lib.readJSON(videoDetailsFileName);
	const videoDetailsChanged = videoDetails.find(
		video => video.id === videoId
	);

	const index = videoDetailsChanged.comments.findIndex(
		comment => comment.id === commentId
	);

	if (index === -1) {
		return res.status(404).send(JSON.stringify(deleteMsgErr));
	} else {
		res.send(deleteComment);
		videoDetailsChanged.comments.splice(index, 1);
	}

	lib.writeJSON(videoDetailsFileName, videoDetails);
});

module.exports = router;
