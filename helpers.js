const parseJson = (data, callback) => {
	try {
		messageObject = JSON.parse(data);
	} catch (e) {
		return console.error(e);
		callback(e);
	}
	callback('', messageObject);
};


module.exports = {
	parseJson : parseJson
}
