const express = require('express');
const app = express();
const PORT = 8080;
const videosRoutes = require('./routes/videos');
const videoDetailsRoutes = require('./routes/video-details');
const commentsRoute = require('./routes/comments');

app.use(express.json());
app.use('/videos', [videosRoutes, videoDetailsRoutes, commentsRoute]);

app.listen(PORT, () => {
	console.log('Link Start!');
});
