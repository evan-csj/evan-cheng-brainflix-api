const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const videoDetailsPath = '../data/video-details.json';

router.post('/:videoId/comments', (req, res) => {
	const videoId = req.params.videoId;
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	newComment.id = uuid();

	fs.readFile(path.resolve(__dirname, videoDetailsPath), (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('ERROR: READING FILE');
		}

		const videoDetails = JSON.parse(data);
		const videoDetailsChanged = videoDetails.find(
			video => video.id === videoId
		);

		videoDetailsChanged.comments.push(newComment);

		fs.writeFile(
			path.resolve(__dirname, videoDetailsPath),
			JSON.stringify(videoDetails, null, 4),
			err => {
				if (err) {
					console.error(err);
					return res.status(500).send('ERROR: WRITING FILE');
				}
			}
		);
	});

	res.send(newComment);
});

router.delete('/:videoId/comments/:commentId', (req, res) => {
	const videoId = req.params.videoId;
	const commentId = req.params.commentId;

	fs.readFile(path.resolve(__dirname, videoDetailsPath), (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send('ERROR: READING FILE');
		}

		const videoDetails = JSON.parse(data);
		const videoDetailsChanged = videoDetails.find(
			video => video.id === videoId
		);

		const index = videoDetailsChanged.comments.findIndex(
			comment => comment.id === commentId
		);

		if (index === -1) {
			return res
				.status(500)
				.send(
					JSON.stringify({ message: 'ERROR: COMMENT NOT EXISTING' })
				);
		} else {
			videoDetailsChanged.comments.splice(index, 1);
		}

		fs.writeFile(
			path.resolve(__dirname, videoDetailsPath),
			JSON.stringify(videoDetails, null, 4),
			err => {
				if (err) {
					console.error(err);
					return res.status(500).send('ERROR: WRITING FILE');
				}
			}
		);
	});

	const deleteComment = req.body;
	res.send(deleteComment);
});

module.exports = router;
