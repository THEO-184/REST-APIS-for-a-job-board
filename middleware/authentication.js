// authentication middleware
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
	const autHeader = req.headers.authorization;
	if (!autHeader || !autHeader.startsWith("Bearer")) {
		throw new UnauthenticatedError(
			"User is not authorized to access this page"
		);
	}
	const token = autHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userId: decoded.userId, name: decoded.name };
		next();
	} catch (error) {
		throw new UnauthenticatedError("User is not authenticated");
	}
};

module.exports = authenticationMiddleware;
