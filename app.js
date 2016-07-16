const setServerOptions = (server,restify) => {
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser({ mapParams: true }));
    server.use(restify.CORS());
    server.use(restify.fullResponse());

    require("./routes").initiateRoutes(server);
};

module.exports = {
    setServerOptions:setServerOptions
};
