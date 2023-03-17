const express = require('express');
const router = express.Router();

router.post('/:videoId/comments', (req, res) => {
	const newComment = req.body;
	newComment.likes = 0;
	newComment.timestamp = Date.now();
	console.log(newComment)
	res.send(req.body);
});

module.exports = router;
