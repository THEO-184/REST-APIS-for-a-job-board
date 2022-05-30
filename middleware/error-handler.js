const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
	let customeError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong try again later",
	};
	// handle when user fails to provide required register info
	if (err.name === "ValidationError") {
		customeError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		customeError.statusCode = 400;
	}
	// handle email validation messages
	if (err.code && err.code === 11000) {
		customeError.msg = `Duplicate value for ${Object.keys(
			err.keyValue
		)},please choose a different value`;
		customeError.statusCode = 404;
	}
	// cast error
	if (err.name === "CastError") {
		customeError.msg = `No item found with id : ${err.value}`;
		customeError.statusCode = 400;
	}

	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
	return res.status(customeError.statusCode).json({ msg: customeError.msg });
};

module.exports = errorHandlerMiddleware;
