const db = require('../db_interactor');


const searchDisplacement = (lat, lng, radius, routerCallBack) => {
	const earth_radius = 6371; //mean radius in km
	const maxLat = lat + ((radius*180)/(earth_radius*Math.PI));
	const minLat = lat - ((radius*180)/(earth_radius*Math.PI));
	const maxLng = lng + ((Math.asin(radius/earth_radius)/Math.cos(lat*Math.PI/180))*(180/Math.PI));
	const minLng = lng - ((Math.asin(radius/earth_radius)/Math.cos(lat*Math.PI/180))*(180/Math.PI));
	const degLat = lat * Math.PI / 180;
	const degLng = lng * Math.PI / 180;

	
	
		



};
