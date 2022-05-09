const fs = require("fs");
const encrypDecry = require("../utils/encDecUtil");

/**
 *
 * @param {read File Path} readF
 * @param {secret key to encrypt the file contents} key
 */
const encryptFile = (readF, writeF, key) => {
	fs.readFile(readF, (err, file) => {
		if (err) return console.error(err.message);

		console.log(`Key: ${key}`);

		const encryFile = encrypDecry.encrypt(file, key);

		fs.writeFile(writeF, encryFile, (err, file) => {
			if (err) console.error(err);
		});
	});
};

/**
 *
 * @param {Read file path to decrypt} filepath
 * @param {secret key(same key used while encryption) to decrypt the file} key
 */
const decryptFile = (filepath, key) => {
	fs.readFile(filepath, (err, file) => {
		if (err) return console.error(err.message);

		const decryFile = encrypDecry.decrypt(file, key);

		fs.writeFile(filepath, decryFile, (err, file) => {
			if (err) console.error(err);

			console.log("File decrypted successfull");
		});
	});
};

module.exports = { encryptFile, decryptFile };
