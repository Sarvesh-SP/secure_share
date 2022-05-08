const jwt = require("jsonwebtoken");

const { validateToken } = require("../../services/userService");

const verifyToken = (req, res, next) => {
	const token = req.header("Authorization").replace("Bearer ", "");

	validateToken(token)
		.then((user) => {
			if (!user)
				return res.status(403).json({ message: "Token is not found!" });

			jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
				if (error)
					res.status(403).json({ message: "Token is not valid!" });

				req.user = user;
				req.token = token;
				next();
			});
		})
		.catch((err) => {
			res.status(500).json({ message: "Something went wrong!" });
		});
};

module.exports = { verifyToken };
