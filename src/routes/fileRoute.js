const { Router } = require("express");
const fileUtil = require("../utils/fileUtil");
const { verifyToken } = require("../middleware/auth");

const fileController = require("../controller/fileController");

const router = Router();

//Upload file
router.post("/create", verifyToken, fileController.createFile);

// router.get("/download", userController.login);

router.post("/linkGen", verifyToken, fileController.downLinkGen);

router.get("/download/:id", verifyToken, fileController.downloadFile);
module.exports = router;
