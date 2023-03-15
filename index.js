const express = require('express');
const app = express();
const videos = require('./data/videos.json');

app.get('/videos', (req, res) => {
	res.send(videos);
});

app.listen(8080, () => {
	console.log('Link Start!');
});
