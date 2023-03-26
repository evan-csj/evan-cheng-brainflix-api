const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const PORT = 8080;
const videosJSON = require('./data/videos.json');
const videosRoutes = require('./routes/videos');
const videoDetailsRoutes = require('./routes/videoDetails');

app.use(express.json());
app.use(cors());
app.use(express.static('./public/images'));
app.use('/videos', [videosRoutes, videoDetailsRoutes]);
app.get('/home', (_req, res) => {
	res.send(videosJSON[0]);
});
app.get('/public/images', (_req, res) => {
	res.send(fs.readdirSync('./public/images'));
});

app.listen(PORT, () => {
	console.log('Link Start!');
});
