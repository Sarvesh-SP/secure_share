const { Router } = require("express");
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const router = Router();

router.post("/create", userController.createUser);

router.get("/profile", verifyToken, userController.profile);

router.post("/login", userController.login);

router.delete("/logout", verifyToken, userController.logout);

module.exports = router;
