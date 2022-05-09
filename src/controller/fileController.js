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
			const { id, email } = req.userId;
			const response = await fileService.create(req.file, id, email);
			return res.redirect("/complete");
		} catch (err) {
			return res.status(400).send({ error: err.message });
		}
	});
};

const downLinkGen = async (req, res) => {
	const { rod, key } = req.body;
	const data = JSON.parse(rod);
	try {
		const { fileLink, name, size } = await fileService.mediate(
			data.uuid,
			key
		);
		res.render("mediator", { fileLink, name, size });
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

const downloadFile = async (req, res) => {
	const { id } = req.params;
	const { key } = req.query;
	try {
		const response = await fileService.download(id, key);

		res.download(response.filePath);
	} catch (err) {
		return res.status(400).send(err.message);
	}
};

module.exports = { createFile, downLinkGen, downloadFile };
