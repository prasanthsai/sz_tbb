const curl = require('../curl');
const helpers = require('../helpers');
const config = require('../config');
const async = require('async');


const query = (origin, hotelData, queryCallBack) => {
	const noOfLoops = Math.ceil(hotelData.length/config.googleapi.location_limit_per_request);
	const distanceAndDurationData = [];
	const hotelReverseMap = {};
	async.each(
		Array.apply(null, {length: noOfLoops}).map(Number.call, Number), 
		(index, callback) => {
			const indexStart = index * config.googleapi.location_limit_per_request;
			const indexEnd = Math.min(indexStart + config.googleapi.location_limit_per_request, hotelData.length);
			const parsedLocation = hotelData.slice(indexStart, indexEnd).map(entry => {
				hotelReverseMap[entry.lat + ',' + entry.lng] = entry.hid;
				return {
					lat : entry.lat,
					lng : entry.lng
				};
			});
			
			curl.doOnRoadDistanceCurl(origin, parsedLocation, (err, data) => {
				helpers.parseJson(data, (err, jsdata) => {
					jsdata.destination_addresses.forEach((element, dindex) => {
						distanceAndDurationData.push([
							hotelReverseMap[element],
							jsdata.rows[0].elements[dindex].distance.value/1000,
							jsdata.rows[0].elements[dindex].duration.value
						]);
					});
				});
			});
			
		},
		err => {
			if (err) {
				queryCallBack(err, distanceAndDurationData);
				return
			}
			distanceAndDurationData.sort((m, n) => (m[1] == n[1] ? 0 : m[1] < n[1] ? -1 : 1));
			queryCallBack(err, distanceAndDurationData);
		}
	);
};

module.exports = {
    query: query
};

