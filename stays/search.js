const locality = require('../locality.js');
const config = require('../config');
const searchDisplacement = require('./search_displacement');
const queryDistance = require('./search_distance_google_api');
const DBSearch = require("./search_db_handler");


const execute = (location, radius, res, routeCallBack) => {
	locality.getLocationDetails(location, radius, (err, data) => {
		if (data.crawl_status) {
			DBSearch.read(data.id, (err, resData) => {
				routeCallBack(err, res, resData.slice(0, config.search.bucket_size));
			});
			//Read from DB And Dump
		} else {
			queryGoogleAPI(data, (err, resData) => {
				routeCallBack(err, res, resData.slice(0, config.search.bucket_size));
				DBSearch.save(
					data.id, 
					resData 
				);
			});
		}
	});
	
};

const queryGoogleAPI = (data, queryCallBack) => {
	[lat, lng] = data.location.split(',');
	searchDisplacement.query(parseFloat(lat), parseFloat(lng), data.radius, (err, hlist) => {
		queryDistance.query(
			{
				lat: lat,
				lng: lng,
				id: data.id
			},
			hlist.data,
			queryCallBack
		);
	});
};


module.exports = {
	execute: execute
};
