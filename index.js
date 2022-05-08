const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT | 3000;

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

//Db Connect
require("./src/config/test_db");

const userRouter = require("./src/routes/userRoute");
const fileRouter = require("./src/routes/fileRoute");

//Routingusers
app.use("/api/users", userRouter);
app.use("/api/files", fileRouter);

app.listen(port, () => {
	console.log(`Connected to http://localhost:${port}`);
});
