const curl = require('curlrequest');
const config = require('./config');

const doLocalityCurl = (searchString, dataCallBack) => {
	const options = {
		url : config.endpoints.devsearch + searchString + '/0/0/null/10',
		headers : {
			Origin : 'https://devwww.stayzilla.com',
			Accept: '*/*',
			Referer: 'https://devwww.stayzilla.com/'
		},
		useragent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
	};
	doCurl(options, dataCallBack);
};


const doOnRoadDistanceCurl = (origins, destinations, dataCallBack) => {
	const data = {
		origins : origins.lat + ',' + origins.lng,
		destinations : destinations.map(entry => (entry.lat + ',' + entry.lng)).join('|')
	};
	const options = {
		url : config.googleapi.url + 'origins=' + data.origins + '&destinations=' + data.destinations,
	};
	doCurl(options, dataCallBack);

};

const doCurl = (options, dataCallBack) => {
	curl.request(options, (err, data) => {
		dataCallBack(err, data)	;
	});
};



module.exports = {
	doLocalityCurl: doLocalityCurl,
	doOnRoadDistanceCurl : doOnRoadDistanceCurl
}
