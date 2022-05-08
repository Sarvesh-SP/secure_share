const userService = require("../services/userService");

const createUser = async (req, res) => {
	if (!req.body.password) {
		return res.status(400).send("Missing Password field");
	}

	try {
		const response = await userService.create(req.body);

		return res.status(201).json(response);
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const response = await userService.signIn(req.body);

		return res.json(response);
	} catch (err) {
		return res.status(400).json(err);
	}
};

const profile = async (req, res) => {
	try {
		const response = await userService.readProfile(req.user);

		return res.json({ data: response });
		return res.json(req.user);
	} catch (err) {
		return res.status(400).json(err.message);
	}
};

const logout = async (req, res) => {
	try {
		const user = await userService.deleteToken(req.token);
		res.json(user);
	} catch (err) {
		return res.status(400).json(err);
	}
};

module.exports = { login, logout, createUser, profile };
