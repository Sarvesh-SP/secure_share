const User = require("../models/userModel");
const userUtil = require("../utils/userUtil");
const bcrypt = require("bcrypt");

const create = async (body) => {
	const user = new User(body);

	const result = await user.save();

	if (!userUtil.check(result)) {
		throw {
			message: "Unable to create the user",
		};
	}

	const token = await user.genAuth();

	return {
		user,
		token,
	};
};

const signIn = async (body) => {
	const { email, password } = body;

	const user = await User.findOne({ email });

	if (!userUtil.check(user)) {
		throw {
			message: "User does'nt exist",
		};
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw { message: "Wrong Password" };
	}

	const token = await user.genAuth();
	return {
		user,
		token,
	};
};

const readProfile = async (user) => {
	if (!userUtil.check(user)) {
		throw {
			message: "User Does'nt exist",
		};
	}

	await user.populate("files");

	return {
		user,
		files: user.files,
	};
};

const validateToken = async (token) => {
	const user = await User.findOne({
		tokens: {
			$in: [token],
		},
	});

	return user;
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

module.exports = { create, validateToken, readProfile, deleteToken, signIn };
