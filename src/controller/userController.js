const userService = require("../services/userService");

const createUser = async (req, res) => {
	if (!req.body.password) {
		return res.status(400).send("Missing Password field");
	}

	try {
		const { user, token } = await userService.create(req.body);

		return res.status(201).json({ user, token });
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { user, token } = await userService.signIn(req.body);

		res.json({
			user,
			token,
		});
	} catch (err) {
		return res.status(400).json(err);
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

module.exports = { login, logout, createUser };
