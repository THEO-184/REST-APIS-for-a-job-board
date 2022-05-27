const { Router } = require("express");
const express = require("express");
const {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
} = require("../controllers/jobs");

const route = express.Router();

route.get("/", getAllJobs);
route.get("/:id", getJob);
route.post("/", createJob);
route.patch("/:id", updateJob);
route.delete("/:id", deleteJob);

module.exports = route;
