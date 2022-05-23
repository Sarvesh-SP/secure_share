const File = require("../models/fileModel");
const algoService = require("../services/encDecService");
const fileUtil = require("../utils/fileUtil");
const sendMail = require("../services/emailService");
const { randomKeyGen } = require("../utils/commonUtils");
const { v4: uuidv4 } = require("uuid");

const create = async (body, id, email) => {
	const { path, size, filename } = body;
	const encryptPath = "encrypts\\" + filename;
	const key = randomKeyGen();
	console.log("key: ", key);

	algoService.encryptFile(
		fileUtil.downloadLink(path),
		fileUtil.downloadLink(encryptPath),
		key
	);

	// console.log(p.resolve(path), p.resolve(__dirname + "../../../encrypts"));
	//path = uploads\Sarvesh SP-4MW18CS068.pdf
	//encryptPath = encrypts\<file_name>
	const file = new File({
		filename,
		path,
		encryptPath,
		size,
		key,
		uuid: uuidv4(),
		size,
		user: id,
	});

	const emails = [
		"sarvesh.sp2013@gmail.com",
		"thegohanthing18@gmail.com",
		"sarvesh.18cs068@sode-edu.in",
		email,
	];

	//Sender Mail
	const from = "sharecloud0@gmail.com";

	emails.forEach((mail) => {
		const to = mail;

		sendMail({
			from,
			to,
			subject: "Cloud Share Key",
			text: `The key for ${filename} has been shared with you.`,
			html: require("../utils/emailUtil")({
				emailFrom: from,
				secret_key: key,
				size: parseInt(file.size / 1000) + "KB",
				expires: "24 hours",
			}),
		});
	});

	const result = await file.save();

	if (!fileUtil.check(result)) {
		throw {
			message: "Something went wrong while uploading..",
		};
	}

	return {
		data: result,
	};
};

const mediate = async (id, key) => {
	const file = await File.findOne({ uuid: id });

	if (!fileUtil.check(file)) {
		throw {
			message: "File Must have been deleted",
		};
	}

	const fileLink = fileUtil.linkGen(file.uuid, key);

	return {
		fileLink,
		name: file.filename,
		size: file.size,
	};
};

const download = async (id, key) => {
	const file = await File.findOne({ uuid: id });
	if (!file) {
		throw {
			message: "file not found!",
		};
	}
	let filePath = "";
	if (key === file.key) {
		console.log("decrypt file sent");
		filePath = fileUtil.downloadLink(file.path);
	} else {
		console.log("encrypt file sent");
		filePath = fileUtil.downloadLink(file.encryptPath);
	}

	return {
		filePath,
	};
};

module.exports = { create, mediate, download };
