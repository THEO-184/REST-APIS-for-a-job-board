const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ user: { name: user?.name }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	// verify email
	if (!email || !password) {
		throw new BadRequestError("please provide all user credentials");
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("invalide credentials");
	}
	// verify password
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		throw new UnauthenticatedError("invalide credentials");
	}
	const token = user.createJWT();

	res.status(StatusCodes.OK).json({ user: { name: user?.name }, token });
};

module.exports = {
	register,
	login,
};
