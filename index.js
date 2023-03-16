const express = require('express');
const app = express();
const PORT = 8080;
const videosRoutes = require('./routes/videos');
const videoDetailsRoutes = require('./routes/video-details');

app.use('/videos', [videosRoutes, videoDetailsRoutes]);

app.listen(PORT, () => {
	console.log('Link Start!');
});
