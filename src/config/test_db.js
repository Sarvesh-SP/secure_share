const mongoose = require("mongoose");

class connectDB {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(process.env.TESTMONGO, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log("Database connection successful");
			})
			.catch((err) => {
				console.error("Database connection error");
			});
	}
}

module.exports = new connectDB();
