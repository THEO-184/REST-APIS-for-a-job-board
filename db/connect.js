const mongoose = require("mongoose");

const connectDB = (url) => {
	return mongoose.connect(url, {
		useFindAndModify: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
	});
};

module.exports = connectDB;
