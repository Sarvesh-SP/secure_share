const adminService = require("../services/adminService");
const userUtil = require("../utils/userUtil");
const { maxAge } = require("../utils/commonUtils");
const fs = require("fs");

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
		return res.redirect("/");
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

const delUser = async (req, res) => {
	try {
		console.log(req.body.email);
		const { user } = await adminService.deleteUser(req.body.email);

		return res.status(204).send(user);
	} catch (e) {
		const errors = userUtil.handleErrors(e);
		return res.status(400).json({ errors });
	}
};

const delFile = async (req, res) => {
	try {
		const { file } = await adminService.deleteFile(req.body.key);
		// use fs.unlink(path to the file) to delete file from uploads and encrypts directory

		return res.status(204).send(file);
	} catch (e) {
		const errors = userUtil.handleErrors(e);
		return res.status(400).json({ errors });
	}
};

module.exports = {
	create,
	login,
	logout,
	fetchUsers,
	fetchFiles,
	delFile,
	delUser,
};
