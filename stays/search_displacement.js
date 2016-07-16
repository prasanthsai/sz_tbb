const db = require('../db_interactor');


const query = (lat, lng, radius, queryCallBack) => {
	const earth_radius = 6371; //mean radius in km
	const maxLat = lat + ((radius*180)/(earth_radius*Math.PI));
	const minLat = lat - ((radius*180)/(earth_radius*Math.PI));
	const maxLng = lng + ((Math.asin(radius/earth_radius)/Math.cos(lat*Math.PI/180))*(180/Math.PI));
	const minLng = lng - ((Math.asin(radius/earth_radius)/Math.cos(lat*Math.PI/180))*(180/Math.PI));
	const degLat = lat * Math.PI / 180;
	const degLng = lng * Math.PI / 180;

	db.queryHotelsInRadius(degLat, degLng, minLat, minLng, maxLat, maxLng, radius, earth_radius, (err, data) => {
		const data_res = {
			info: {
				results: data.length
			},
			data: data.map(item => {
				return {
					hid: item.hid,
					lat: item.lat,
					lng: item.lng,
					disp: item.disp
				};
			})
		};
		queryCallBack(err, data_res);
	});
	
};

const search = (lat, lng, radius, res, routerCallBack) => {
	query(parseFloat(lat), parseFloat(lng), parseInt(radius), (err, data) => {
		routerCallBack(err, res, data);
	});
};

module.exports = {
	search: search,
	query: query
};
