const { Router } = require("express");
const userController = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");
const router = Router();

router.post("/create", userController.createUser);

router.post("/login", userController.login);

// router.get("/profile", verifyToken, userController.profile);

router.get("/logout", verifyToken, userController.logout);

module.exports = router;
