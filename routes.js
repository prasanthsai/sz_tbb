const locality = require('./locality'); 
const searchStays = require('./search_stays');
const getStaysWithDistance = require('./get_stays_distance');



const initiateRoutes = (server) => {
        server.get("/localitysearch/:search_string", routeLocalitySearch);
	server.get("/searchstays/:lat/:lng/:radius", routeSearchStays);
	server.on('NotFound', routeUnknownPaths);
}

const routeLocalitySearch = (req, res, next) => {
	locality.search(req.params.search_string, res, sendresponse);
	return next();
};

const routeSearchStays = (req, res, next) => {
	locality.search(req.params.search_string, res, sendresponse);
	return next();
};

const routeUnknownPaths = (req, res) => {
    res.json(400,"Not a valid endpoint.Refer documentation for the supported endpoints.");
};

const sendresponse = (err,res,response) => {res.send(response);};

module.exports = {
    initiateRoutes: initiateRoutes
};
