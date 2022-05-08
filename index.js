const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT | 3000;

app.use(cors());

app.use(express.json());

require("./src/config/test_db");

app.get("/", (req, res) => {
	res.send("Getting started");
});

app.listen(port, () => {
	console.log(`Connected to http://localhost:${port}`);
});
