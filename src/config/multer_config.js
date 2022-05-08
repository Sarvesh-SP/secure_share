const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

let upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 * 100 },
}).single("fileboi");

module.exports = upload;
