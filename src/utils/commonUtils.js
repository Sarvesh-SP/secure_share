const maxAge = 3 * 24 * 60 * 60;
const crypto = require("crypto");

const algorithm = "aes-256-ctr";
// const algorithm = "aes-192-cbc";

const keyGen = (key) => {
	let hashKey = crypto
		.createHash("sha256")
		.update(String(key))
		.digest("base64")
		.substring(0, 32);
	return hashKey;
};

const randomKeyGen = () => {
	let r = Math.random().toString(36).substring(2, 12);

	return r.toUpperCase();
};

module.exports = { algorithm, keyGen, randomKeyGen, maxAge };
