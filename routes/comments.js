const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.post('/:videoId/comments', (req, res) => {
	const videoId = req.params.videoId;
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	newComment.id = uuid();

	fs.readFile(
		path.resolve(__dirname, '../data/video-details.json'),
		(err, data) => {
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
				path.resolve(__dirname, '../data/video-details.json'),
				JSON.stringify(videoDetails),
				err => {
					// if (err) {
					// 	console.error(err);
					// 	return res.status(500).send('ERROR: WRITING FILE');
					// } else {
					// 	return res.status(500).send('SUCCESS: WRITING FILE');
					// }
				}
			);

			// console.log(videoDetailsJSON);
		}
	);

	// const videoDetailsJSON = videoDetailsJson.find(
	// 	element => element.id === videoId
	// );

	res.send(newComment);
});

router.delete('/:videoId/comments/:commentId', (req, res) => {
	const deleteComment = req.body;
	res.send(deleteComment);
});

module.exports = router;
