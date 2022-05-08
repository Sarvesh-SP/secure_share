const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { createJWTToken } = require("../utils/createToken");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		tokens: {
			type: Array,
			default: [],
		},
	},
	{ timestamps: true }
);

userSchema.virtual("files", {
	ref: "File",
	localField: "_id",
	foreignField: "user",
});

userSchema.methods.genAuth = async function () {
	const user = this;
	const payload = {
		id: user._id.toString(),
	};

	const accessToken = createJWTToken(payload);

	user.tokens = user.tokens.concat(accessToken);
	await user.save();

	return accessToken;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
