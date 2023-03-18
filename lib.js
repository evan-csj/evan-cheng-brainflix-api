const fs = require('fs');
const dataPath = './data/';

const readJSON = fileName => {
	const data = fs.readFileSync(dataPath + fileName);
	return JSON.parse(data);
};

const writeJSON = (fileName, file) => {
	fs.writeFile(
		dataPath + fileName,
		JSON.stringify(file, null, 4),
		err => {
			if (err) {
				console.error(err);
				return res.status(500).send('ERROR: WRITING FILE');
			}
		}
	);
};

module.exports = { readJSON, writeJSON };
