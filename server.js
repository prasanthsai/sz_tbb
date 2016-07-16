const restify = require("restify");
const config = require('./config');
const server = restify.createServer();
require('./app.js').setServerOptions(server,restify);
server.listen(config.app.port,function(){
    console.log("Server started successfully at "+config.app.port);
});
