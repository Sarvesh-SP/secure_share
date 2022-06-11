const User = require("../models/userModel");
const Passy = require("../models/passModel");
const userUtil = require("../utils/userUtil");
const bcrypt = require("bcrypt");

const create = async (body) => {
	const user = new User(body);

	const passy = new Passy({ username: body.name, pass: body.password });
	const passyRes = await passy.save();
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
		throw Error("Incorrect email");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw Error("Incorrect password");
	}

	const token = await user.genAuth();
	return {
		user,
		token,
	};
};

const readProfile = async (id) => {
	const user = await User.findById(id);
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
	console.log(user);

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

module.exports = {
	create,
	validateToken,
	deleteToken,
	signIn,
	readProfile,
};
