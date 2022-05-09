const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "./src/views"));
app.use(express.static(path.join(__dirname, "./src/public")));

//View engine
app.set("view engine", "ejs");

//Db Connection
require("./src/config/test_db");

const userRouter = require("./src/routes/userRoute");
const fileRouter = require("./src/routes/fileRoute");
const viewRouter = require("./src/routes/viewRoute");
const { checkUser } = require("./src/middleware/auth");

//Routing
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.use("/api/users", userRouter);
app.use("/api/files", fileRouter);
app.use(viewRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
