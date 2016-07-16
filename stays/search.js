const locality = require('../locality.js');
const config = require('../config');
const searchDisplacement = require('./search_displacement');
const queryDistance = require('./search_distance_google_api');


const execute = (location, radius, res, routeCallBack) => {
	locality.getLocationDetails(location, radius, (err, data) => {
		if (data.crawl_status) {
			//Read from DB And Dump
		} else {
			[lat, lng] = data.location.split(',');
			searchDisplacement.query(parseFloat(lat), parseFloat(lng), data.radius, (err, hlist) => {
				queryDistance.query(
					{
						lat: lat,
						lng: lng,
						id: data.id
					},
					hlist.data,
					(err, distanceAndDurationData) => {
						routeCallBack(err, res, distanceAndDurationData.slice(0, 200));
					}
				);
				
			});
			//Get hotel list
		}
	});
	
};

module.exports = {
	execute: execute
};
