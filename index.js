const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

const videosRoutes = require('./routes/videos');
const videoDetailsRoutes = require('./routes/videoDetails');
const commentsRoute = require('./routes/comments');

app.use(express.json());
app.use(cors());
app.use(express.static('./public/images'));
app.use('/videos', [videosRoutes, videoDetailsRoutes, commentsRoute]);

app.listen(PORT, () => {
	console.log('Link Start!');
});
