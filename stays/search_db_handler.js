const db = require('../db_interactor');

const save = (locId, data ) => {
	const serializeData = JSON.stringify(data);
	db.insertLocalityCrawled(locId, serializeData, (err, data) => {
		if (err) {
			console.log('Something went wrong!');
			return;
		}
		db.updateCrawledStatus(locId, 1, (err, data) => {
			if (err) {
				console.log('Something went wrong!');
				return;
			}
		});
	});
};


const read = (locId, readCallBack) => {
	db.getLocalityCrawled(locId, (err, data) => {
		if (err) {
			console.log('Something went wrong!');
			return;
		}
		const parsedData = JSON.parse(data[0].search_result);
		readCallBack(err, parsedData);
	});
};


module.exports = {
	save: save,
	read: read
};
