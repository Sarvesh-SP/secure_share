const { Router } = require("express");

const { verifyToken } = require("../middleware/auth");
const router = Router();

router.get("/upload", verifyToken, (req, res) => {
	res.render("upload");
});

router.get("/signup", (req, res) => res.render("signup"));

router.get("/complete", (req, res) => res.render("done"));

router.get("/login", (req, res) => res.render("login"));

router.get("/download", verifyToken, (req, res) => {
	res.render("download");
});

router.get("/file", (req, res) => res.render("mediator"));

module.exports = router;
