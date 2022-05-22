const { Router } = require("express");
const { verifyAdminToken } = require("../middleware/auth");

const { verifyToken } = require("../middleware/auth");
const router = Router();

router.get("/", (req, res) => res.render("home"));

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

//Admin routes

router.get("/admin", verifyAdminToken, (req, res) => res.render("admin/me"));
router.get("/admin/create", (req, res) => res.render("admin/signup"));
router.get("/admin/login", (req, res) => res.render("admin/login"));
// router.get("/admin/users", (req, res) => res.render("admin/users"));
// router.get("/admin/files", (req, res) => res.render("admin/files"));

module.exports = router;
