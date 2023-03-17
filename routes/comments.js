const { v4: uuid } = require('uuid');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const options = 

router.post('/:videoId/comments', (req, res) => {
	const videoDetails = require('../data/video-details.json');
	const videoId = req.params.videoId;
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	newComment.id = uuid();

	const videoDetailsJSON = videoDetails.find(
		element => element.id === videoId
	);
	videoDetailsJSON.comments.push(newComment);
	console.log(videoDetails);

	res.send(newComment);
});

router.delete('/:videoId/comments/:commentId', (req, res) => {
	const deleteComment = req.body;
	res.send(deleteComment);
});

module.exports = router;
