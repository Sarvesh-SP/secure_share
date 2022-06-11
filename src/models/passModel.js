const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
	{
		username: String,
		pass: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Passy", passSchema);
