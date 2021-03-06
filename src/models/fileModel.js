const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
	{
		filename: { type: String, required: true },
		path: { type: String, required: true },
		size: { type: Number, required: true },
		uuid: { type: String, required: true },
		key: {
			type: String,
		},
		// sender: { type: String, required: false },
		// receiver: { type: String, required: false },
		encryptPath: {
			type: String,
			required: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

fileSchema.virtual("details", {
	ref: "User",
	localField: "user",
	foreignField: "_id",
});

module.exports = mongoose.model("File", fileSchema);
