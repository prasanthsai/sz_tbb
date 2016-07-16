const locality = require('./locality'); 
const searchStaysDisplacement = require('./stays/search_displacement');
const search = require('./stays/search');
//const getStaysWithDistance = require('./get_stays_distance');



const initiateRoutes = (server) => {
        server.get("/localitysearch/:search_string", routeLocalitySearch);
	server.get("/searchstays_displacement/:lat/:lng/:radius", routeSearchStaysDisplacement);
	server.get("/search/:location/:radius", routeSearch);
	server.on('NotFound', routeUnknownPaths);
}

const routeLocalitySearch = (req, res, next) => {
	locality.search(req.params.search_string, res, sendresponse);
	return next();
};

const routeSearchStaysDisplacement = (req, res, next) => {
	searchStaysDisplacement.search(req.params.lat, req.params.lng, req.params.radius, res, sendresponse);
	return next();
};

const routeSearch = (req, res, next) => {
	search.execute(req.params.location, req.params.radius, res, sendresponse);
	return next();
}

const routeUnknownPaths = (req, res) => {
    res.json(400,"Not a valid endpoint.Refer documentation for the supported endpoints.");
};

const sendresponse = (err,res,response) => {res.send(response);};

module.exports = {
    initiateRoutes: initiateRoutes
};
