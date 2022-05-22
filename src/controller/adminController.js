const adminService = require("../services/adminService");
const userUtil = require("../utils/userUtil");
const { maxAge } = require("../utils/commonUtils");

const create = async (req, res) => {
	if (!req.body.password) {
		return res.status(400).send("Missing Password field");
	}
	try {
		const response = await adminService.create(req.body);

		const { token, admin } = response;

		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		return res.status(201).json({ admin: admin._id });
	} catch (err) {
		const errors = userUtil.handleErrors(err);
		return res.status(400).json({ errors });
	}
};

const login = async (req, res) => {
	try {
		const response = await adminService.login(req.body);
		const { admin, token } = response;

		//cookie setup
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		if (admin.role !== "admin") {
			return res.status(200).json({ admin: false });
		}

		return res.status(200).json({ admin: true });
	} catch (err) {
		const errors = userUtil.handleErrors(err);
		return res.status(400).json({ errors });
	}
};

const logout = async (req, res) => {
	try {
		const admin = await adminService.deleteToken(req.cookies.jwt);
		res.cookie("jwt", "", { maxAge: 1 });
		return res.redirect("/admin");
	} catch (err) {
		return res.status(400).json(err);
	}
};

const fetchUsers = async (req, res) => {
	try {
		const { userDetails } = await adminService.listUsers();

		return res.render("admin/users", { users: userDetails });
	} catch (e) {
		return res.status(400).json(e.message);
	}
};

const fetchFiles = async (req, res) => {
	try {
		const { fileDetails } = await adminService.listFiles();

		return res.render("admin/files", { files: fileDetails });
	} catch (e) {
		return res.status(400).json(e.message);
	}
};

module.exports = { create, login, logout, fetchUsers, fetchFiles };
