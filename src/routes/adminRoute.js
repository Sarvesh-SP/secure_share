const { Router } = require("express");
const adminController = require("../controller/adminController");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const router = Router();

router.post("/login", adminController.login);

router.post("/create", adminController.create);

router.get("/logout", verifyToken, adminController.logout);

router.get("/users", verifyAdminToken, adminController.fetchUsers);

router.get("/files", verifyAdminToken, adminController.fetchFiles);

module.exports = router;
