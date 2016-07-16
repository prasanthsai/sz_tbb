const curl = require('./curl');
const helpers = require('./helpers');


const search = (search_string, res, routerCallBack) => {
	curl.doLocalityCurl(search_string, (err, data) => {
		helpers.parseJson(data, (err, jsdata) => {
			routerCallBack(err, res, jsdata);
		});
	});

};

module.exports = {
    search: search
};



