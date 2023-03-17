const express = require('express');
const router = express.Router();

router.post('/:videoId/comments', (req, res) => {
	console.log(req.body);
	res.send(req.params.videoId);
});

module.exports = router;
