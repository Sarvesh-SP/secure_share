const jwt = require("jsonwebtoken");

const createJWTToken = (data) => {
	return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = { createJWTToken };
