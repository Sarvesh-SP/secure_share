const jwt = require("jsonwebtoken");
const { maxAge } = require("./commonUtils");

const createJWTToken = (data) => {
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: maxAge });
};

module.exports = { createJWTToken };
