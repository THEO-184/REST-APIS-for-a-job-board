const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

// controller
const getAllJobs = async (req, res) => {
	const userId = req.user.userId;
	const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
	res.status(StatusCodes.OK).json({ total: jobs.length, jobs });
};

const getJob = async (req, res) => {
	const {
		user: { userId },
		params: { id: jobID },
	} = req;
	const job = await Job.findOne({ _id: jobID, createdBy: userId });
	if (!job) {
		throw new NotFoundError(`Job with id ${jobID}`);
	}
	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	const {
		params: { id },
		user: { userId },
		body: { company, position },
	} = req;
	if (!company || !position) {
		throw new BadRequestError("company and position fields required");
	}
	const job = await Job.findOneAndUpdate(
		{ _id: id, createdBy: userId },
		{ company, position },
		{
			new: true,
			runValidators: true,
		}
	);
	if (!job) {
		throw new NotFoundError(`job with id ${id} not found`);
	}
	res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
	const {
		params: { id },
		user: { userId },
	} = req;

	const job = await Job.findOneAndDelete({ _id: id, createdBy: userId });
	if (!job) {
		throw new NotFoundError(`Job with id ${id} not found`);
	}
	res
		.status(StatusCodes.OK)
		.json({ success: true, msg: `Job with id ${id} succesfully deleted` });
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob,
};
