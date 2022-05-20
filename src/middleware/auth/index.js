const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const { validateToken, readProfile } = require("../../services/userService");

//Token verification through Authorization header
// const verifyToken = (req, res, next) => {
// 	const token = req.header("Authorization").replace("Bearer ", "");

// 	validateToken(token)
// 		.then((user) => {
// 			if (!user)
// 				return res.status(403).json({ message: "Token is not found!" });

// 			jwt.verify(token, process.env.JWT_SECRET, (error, docs) => {
// 				if (error)
// 					res.status(403).json({ message: "Token is not valid!" });
// 				req.user = user;
// 				req.userId = docs;
// 				req.token = token;
// 				next();
// 			});
// 		})
// 		.catch((err) => {
// 			res.status(500).json({ message: "Something went wrong!" });
// 		});
// };

//Token Verification through cookie parser
const verifyToken = (req, res, next) => {
	const token = req.cookies.jwt;

	// validateToken(token)
	// 	.then((user) => {
	// 		if (!user) {
	// 			res.redirect("/login");
	// 		}

	// 		jwt.verify(token, process.env.JWT_SECRET, (error, docs) => {
	// 			if (error) {
	// 				res.status(403).json({ message: "Token is not valid!" });
	// 				res.redirect("/login");
	// 			}
	// 			req.userId = docs;
	// 			next();
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).json({ message: "Something went wrong!" });
	// 	});

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				req.userId = decode;
				next();
			}
		});
	} else {
		res.cookie("jwt", "", { maxAge: 1 });
		return res.redirect("/login");
	}
};

const checkUser = (req, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
			if (err) {
				console.log(err.message);
				res.locals.user = null;
				next();
			} else {
				try {
					const { user, files } = await readProfile(decode.id);

					res.locals.user = user;
					res.locals.files = files;
					next();
				} catch (err) {
					res.cookie("jwt", "", { maxAge: 1 });
					if (decode.role === "admin") {
						return res.redirect("/admin/login");
					}
					return res.redirect("/login");
				}
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};

module.exports = { verifyToken, checkUser };
