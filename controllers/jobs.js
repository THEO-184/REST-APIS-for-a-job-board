const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError } = require("../errors");

// controller
const getAllJobs = async (req, res) => {
	const userId = req.user.userId;
	const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
	res.status(StatusCodes.OK).json({ total: jobs.length, jobs });
};

const getJob = async (req, res) => {
	res.send("get a job");
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	res.send("update job");
};

const deleteJob = async (req, res) => {
	res.send("delete job");
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
