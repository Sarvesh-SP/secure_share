const fileService = require("../services/fileService");
const upload = require("../config/multer_config");

const createFile = async (req, res) => {
	upload(req, res, async (err) => {
		if (!req.file) {
			return res.status(400).send({
				error: "Send the files or check if the upload dir is in the correct specified path in the diskstorage destination",
			});
		}
		//Validate data
		if (err) {
			return res.status(400).send({ error: err.message });
		}

		try {
			const response = await fileService.create(req.file, req.userId.id);
			return res.status(201).json(response);
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	});
};

const downloadFile = async (req, res) => {
	const { key } = req.body;
	const { id } = req.params;

	try {
		const response = await fileService.download(id, key);
		res.download(response.filePath);
	} catch (err) {
		return res.status(400).send({ error: err.message });
	}
};

module.exports = { createFile, downloadFile };
