const curl = require('./curl');
const helpers = require('./helpers');
const db = require('./db_interactor');


const search = (search_string, res, routerCallBack) => {
	curl.doLocalityCurl(search_string, (err, data) => {
		helpers.parseJson(data, (err, jsdata) => {
			routerCallBack(err, res, jsdata);
		});
	});
};


const getLocationDetails = (location, radius, callback) => {
	db.queryCrawledStatus(location, radius, (err, data) => {
		if (!data.length) {
			db.insertNewLocality(
				location, 
				radius, 
				(err, Stdata) => {
					console.log(Stdata.insertId)
					callback(
						err, 
						{
							id : Stdata.insertId,
							location : location,
							radius : radius,
							crawl_status : 0
						}
					);
				}
			);
		} else {
			callback(
				err, 
				{
					id : data[0].id,
					location : data[0].location,
					radius : data[0].radius,
					crawl_status : data[0].crawl_status
				}
			);
		}
	});	
};

module.exports = {
    	search: search,
	getLocationDetails: getLocationDetails
};



