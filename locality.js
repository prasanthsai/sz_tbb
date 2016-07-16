const curl = require('./curl');
const helpers = require('./helpers');


const search = (search_string, res, routerCallBack) => {
	curl.doLocalityCurl(search_string, (err, data) => {
		helpers.parseJson(data, (err, jsdata) => {
			routerCallBack(err, res, jsdata);
		});
	});
};


const getLocationId(location, radius, callback) => {
	db.queryCrawledStatus(location, radius, (err, data) => {
		if (!data.length || err) {
			callback('Something went wrong');
			return
		}
		callback(err, data[0].id);
	});	
};

module.exports = {
    	search: search,
	getLocationId: getLocationId
};



