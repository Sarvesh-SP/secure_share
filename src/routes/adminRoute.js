const { Router } = require("express");
const adminController = require("../controller/adminController");
const { verifyToken } = require("../middleware/auth");
const router = Router();

router.post("/login", adminController.login);

router.post("/create", adminController.create);

router.get("/logout", verifyToken, adminController.logout);

module.exports = router;
