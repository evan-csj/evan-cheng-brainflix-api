const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();

router.post('/:videoId/comments', (req, res) => {
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	newComment.id = uuid();
	res.send(newComment);
});

router.delete('/:videoId/comments/:commentId', (req, res) => {
	const deleteComment = req.body;
	res.send(deleteComment);
});

module.exports = router;
