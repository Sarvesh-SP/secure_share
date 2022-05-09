const crypto = require("crypto");
const { algorithm, keyGen } = require("./commonUtils");

/**
 *
 * @param {Takes in the file content buffer} buffer
 * @param {Uses the key to encrypt the buffer} key
 * @returns encrypted buffer contents
 */
const encrypt = (buffer, key) => {
	const iv = crypto.randomBytes(16);

	const cipher = crypto.createCipheriv(algorithm, keyGen(key), iv);

	const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);

	return result;
};

/**
 *
 * @param {Takes in encrypted buffer contents} encrypted
 * @param {Uses the key to decrypt the buffer} key
 * @returns Decrypted file contents
 */
const decrypt = (encrypted, key) => {
	const iv = encrypted.slice(0, 16);

	const leftOvers = encrypted.slice(16);

	const decipher = crypto.createDecipheriv(algorithm, keyGen(key), iv);

	const result = Buffer.concat([
		decipher.update(leftOvers),
		decipher.final(),
	]);

	return result;
};

module.exports = { encrypt, decrypt };
