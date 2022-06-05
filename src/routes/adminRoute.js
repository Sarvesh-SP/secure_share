const { Router } = require("express");
const adminController = require("../controller/adminController");
const { verifyToken, verifyAdminToken } = require("../middleware/auth");
const router = Router();

router.post("/login", adminController.login);

router.post("/create", adminController.create);

router.get("/logout", verifyToken, adminController.logout);

router.get("/users", verifyAdminToken, adminController.fetchUsers);
router.post("/user/del", verifyAdminToken, adminController.delUser);

router.get("/files", verifyAdminToken, adminController.fetchFiles);
router.post("/file/del", verifyAdminToken, adminController.delFile);

module.exports = router;
