const User = require("../models/userModel");
const userUtil = require("../utils/userUtil");
const bcrypt = require("bcrypt");

const create = async (body) => {
	const user = new User(body);

	const admin = await user.save();

	if (!userUtil.check(admin)) {
		throw {
			message: "Unable to create the admin",
		};
	}

	const token = await user.genAuth();

	return {
		admin,
		token,
	};
};

const login = async (body) => {
	const { email, password } = body;

	const admin = await User.findOne({ email });

	if (!userUtil.check(admin)) {
		throw Error("Incorrect email");
	}

	const isMatch = await bcrypt.compare(password, admin.password);

	if (!isMatch) {
		throw Error("Incorrect password");
	}

	const token = await admin.genAuth();
	return {
		admin,
		token,
	};
};

const deleteToken = async (token) => {
	const user = await User.findOneAndUpdate(
		{
			tokens: { $in: [token] },
		},
		{ $pull: { tokens: token } }
	);

	if (user === null) {
		throw {
			message: "Token Not Found",
		};
	}

	return {
		user,
	};
};

module.exports = {
	create,
	login,
	deleteToken,
};
