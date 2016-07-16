const saveSearch = require("./stays/save_results_db");

const execute = (req, resp, route, err) => {
	if (resp.saveCrawledDataStatus) {
		saveSearch.save(resp.saveCrawledData.id, resp.saveCrawledData.data);
	}

};

module.exports = {
	execute: execute
};
