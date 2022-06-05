const User = require("../models/userModel");
const File = require("../models/fileModel");
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

const listUsers = async () => {
	const users = await User.find();
	if (!userUtil.check(users)) {
		throw {
			message: "No users found",
		};
	}

	const userDetails = users.map((user) => {
		const { name, email, _id, role } = user;
		return {
			id: _id,
			name,
			email,
			status: user.tokens.length !== 0 ? "Online" : "Offline",
			role,
		};
	});

	return {
		userDetails,
	};
};

const listFiles = async () => {
	const files = await File.find().populate("user", "name email tokens");

	if (!userUtil.check(files)) {
		throw {
			message: "No files found",
		};
	}
	const fileDetails = files.map((file) => {
		const { filename, key } = file;
		const { name, email, tokens } = file.user;
		const status = tokens.length !== 0 ? "Online" : "Offline";

		return {
			filename,
			key,
			name,
			email,
			status,
		};
	});

	return {
		fileDetails,
	};
};

const deleteFile = async (key) => {
	const file = await File.deleteOne({ key });

	if (!userUtil.check(file)) {
		throw {
			message: "File not found",
		};
	}

	return {
		file,
	};
};

const deleteUser = async (email) => {
	const user = await User.deleteOne({ email });

	console.log(user);

	if (!userUtil.check(user)) {
		throw {
			message: "User not found",
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
	listUsers,
	listFiles,
	deleteFile,
	deleteUser,
};
