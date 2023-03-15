const express = require('express');
const app = express();
const videos = require('./data/videos.json');
const videoDetails = require('./data/video-details.json');

app.get('/videos', (req, res) => {
	res.send(videos);
});

app.get('/video/:videoId', (req, res) => {
	const videoId = req.params.videoId;
	const videoDetail = videoDetails.find(video => video.id === videoId);
	res.send(videoDetail);
});

app.listen(8080, () => {
	console.log('Link Start!');
});
