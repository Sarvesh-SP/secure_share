const File = require("../models/fileModel");
const fileUtil = require("../utils/fileUtil");
const { v4: uuidv4 } = require("uuid");
const p = require("path");

const create = async (body, id) => {
	const { path, size, filename } = body;

	// console.log(p.resolve(path), p.resolve(__dirname + "../../../encrypts"));
	//path = uploads\Sarvesh SP-4MW18CS068.pdf
	//encryptPath = encrypts\<file_name>
	const file = new File({
		filename,
		path,
		size,
		key: "laskfj;lasdjf",
		uuid: uuidv4(),
		size,
		user: id,
	});

	const result = await file.save();

	if (!fileUtil.check(result)) {
		throw {
			message: "Something went wrong while uploading..",
		};
	}

	return {
		fileLink: fileUtil.linkGen(result.uuid),
		data: result,
	};
};

const download = async (id, key) => {
	const file = await File.findOne({ uuid: id });

	if (!fileUtil.check(file)) {
		throw {
			message: "File Must have been deleted",
		};
	}

	let filePath = "";

	if (key === file.key) {
		filePath = fileUtil.downloadLink(file.encryptPath);
	}

	filePath = fileUtil.downloadLink(file.path);

	return {
		filePath,
	};
};

module.exports = { create, download };
