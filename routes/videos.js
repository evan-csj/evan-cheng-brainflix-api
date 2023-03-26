const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();
const lib = require('../lib');
const videosJSON = require('../data/videos.json');
const videosFileName = 'videos.json';

const getBriefList = videos => {
	const videoBrief = videos.map(element => {
		return {
			id: element.id,
			title: element.title,
			channel: element.channel,
			image: element.image,
		};
	});

	return videoBrief;
};

router.get('/', (_req, res) => {
	const videoBrief = getBriefList(videosJSON);
	res.send(JSON.stringify(videoBrief));
});

router.post('/', (req, res) => {
	const newVideo = {
		id: uuid(),
		title: req.body.title,
		channel: req.body.channel,
		image: req.body.image,
		description: req.body.description,
		views: 0,
		likes: 0,
		duraion: '4:58',
		timestamp: Date.now(),
		comments: [],
	};

	const videos = lib.readJSON(videosFileName);
	videos.push(newVideo);
	lib.writeJSON(videosFileName, videos);

	const newVideoBrief = {
		id: newVideo.id,
		title: newVideo.title,
		channel: newVideo.channel,
		image: newVideo.image,
	};
	res.send(JSON.stringify(newVideoBrief));
});

module.exports = router;
