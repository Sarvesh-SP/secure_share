const mongoose = require("mongoose");

class connectDB {
	constructor() {
		this._connect();
	}

	_connect() {
		mongoose
			.connect(process.env.MONGO_URI2, {
				user: process.env.MONGO_U2,
				pass: process.env.MONGO_P2,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log("Database connection successful");
			})
			.catch((err) => {
				console.error("Database connection error" + err.message);
			});
	}
}

module.exports = new connectDB();
