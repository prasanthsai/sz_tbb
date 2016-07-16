const config = require('./config');
const mysql = require('mysql');

const connectionPool      =    mysql.createPool({
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.db,
    host     : config.mysql.host
});

const executeQuery = (sql, callback) => {
    connectionPool.getConnection(function (err, connection) {
        if (err) {
            console.log("Mysql Connection Pool Error: ", err);
            callback(err, null);
            return;
        }
        connection.query(sql , function (err, rows) {
            try {
                if (err) {
                    console.log("Mysql Query Error: ", err);
                    callback(err, rows);
                    return;
                }
                callback(err, rows);
            } catch (e) {
                console.log("Mysql Query Error: ", e);
                callback(err, rows);
            } finally {
                connection.release();
            }
        });
    });
};

const queryCrawledStatus = (location, radius, callback) => {
	execute("select id, location, radius, crawl_status from localities where location like '"+ location + "' and radius = " + radius + " limit 1", callback);
};

const queryHotelsInRadius = (lat, lng, minLat, minLng, maxLat, maxLng, radius, earth_radius, callback) => {
	execute("Select hid, lat, lng, " +
       			"acos(sin(" + lat + ")*sin(radians(lat)) + cos(" + lat + ")*cos(radians(lat))*cos(radians(lng)-" + lng + ")) * " + earth_radius + " As disp " +
		"From hotel_lat_lng " +
		"Where lat Between "+minLat+" And "+maxLat+" " +
  			"And lng Between " + minLng + " And " + maxLng + " " +
  			"And acos(sin(" + lat + ")*sin(radians(lat)) + cos(" + lat + ")*cos(radians(lat))*cos(radians(lng)-" + lng + ")) * " + earth_radius + " < " + radius+" " +
		"Order By disp", callback );
};

const updateCrawledStatus = (id, status, callback) => {
	execute("update localities set crawl_status = " + status + " where id = " + id + " limit 1", callback);
};

const getLocalityCrawled = (id, callback) => {
	execute("select id, search_result from localities_results where id = " + id + " limit 1", callback);
};

const insertLocalityCrawled = (id, search_result, callback) => {
	execute("insert into localities_results (id, search_result) values ("+id+", '"+search_result+"')", callback);
};

const insertNewLocality = (location, radius, callback) => {
	execute("insert into localities (location, radius) values ('" + location + "', '" + radius + "' )", callback);
};

const execute = (sql,callback) => {
    executeQuery(sql,function(err,data){
        callback(err,data);
    });
};

module.exports = {
	queryHotelsInRadius: queryHotelsInRadius,
	queryCrawledStatus: queryCrawledStatus,
	insertLocalityCrawled : insertLocalityCrawled,
	getLocalityCrawled : getLocalityCrawled,
	updateCrawledStatus : updateCrawledStatus,
	insertNewLocality: insertNewLocality
};
