const { Router } = require("express");
const { verifyToken } = require("../middleware/auth");
const fileController = require("../controller/fileController");

const router = Router();

router.post("/create", verifyToken, fileController.createFile);

// router.get("/download", userController.login);

router.post("/download/:id", verifyToken, fileController.downloadFile);

module.exports = router;
