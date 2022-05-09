const userService = require("../services/userService");
const userUtil = require("../utils/userUtil");
const { maxAge } = require("../utils/commonUtils");

const createUser = async (req, res) => {
	if (!req.body.password) {
		return res.status(400).send("Missing Password field");
	}

	try {
		const response = await userService.create(req.body);
		const { token, user } = response;

		//cookie takes in maxAge at miliseconds
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

		return res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = userUtil.handleErrors(err);
		return res.status(400).json({ errors });
	}
};

const login = async (req, res) => {
	try {
		const response = await userService.signIn(req.body);
		const { token, user } = response;

		//cookie setup
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

		return res.status(201).json({ user: user._id });
	} catch (err) {
		const errors = userUtil.handleErrors(err);
		return res.status(400).json({ errors });
	}
};

// const profile = async (req, res) => {
// 	try {
// 		const response = await userService.readProfile(req.user);

// 		return res.json({ data: response });
// 	} catch (err) {
// 		return res.status(400).json(err.message);
// 	}
// };

const logout = async (req, res) => {
	try {
		const user = await userService.deleteToken(req.cookies.jwt);
		res.cookie("jwt", "", { maxAge: 1 });
		res.redirect("/");
	} catch (err) {
		return res.status(400).json(err);
	}
};

module.exports = { login, logout, createUser };
