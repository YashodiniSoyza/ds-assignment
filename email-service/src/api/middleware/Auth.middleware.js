import jwt from "jsonwebtoken";
import logger from "../../util/logger.js";
import User from "../models/Course.model.js";

const verifyAuthToken = async (authToken) => {
	const secret = process.env.ACCESS_TOKEN_SECRET;
	if (!secret) {
		throw new Error("Token Secret is not found");
	}
	const decoded = jwt.verify(authToken, secret);
	return decoded;
};

export const user_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);
		const user = await User.findOne({
			_id: decoded,
			authToken: authToken,
		});

		if (!user) {
			throw new Error("User not found in the system");
		}

		if (user.role !== "Admin" && user.role !== "Faculty" && user.role !== "Student") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = user;

		logger.info(`Authentication Token for ID ${user._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const admin_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);
		const user = await User.findOne({
			_id: decoded,
			authToken: authToken,
		});

		if (!user) {
			throw new Error("User not found in the system");
		}

		if (user.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = user;

		logger.info(`Authentication Token for ID ${user._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const instructor_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);
		const user = await User.findOne({
			_id: decoded,
			authToken: authToken,
		});

		if (!user) {
			throw new Error("User not found in the system");
		}

		if (user.role !== "Instructor" && user.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = user;

		logger.info(`Authentication Token for ID ${user._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};

export const student_auth = async (request, response, next) => {
	try {
		if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer")) {
			response.status(401);
			throw new Error("Not authorized, no token");
		}

		const authToken = request.headers.authorization.split(" ")[1];
		const decoded = await verifyAuthToken(authToken);
		const user = await User.findOne({
			_id: decoded,
			authToken: authToken,
		});

		if (!user) {
			throw new Error("User not found in the system");
		}

		if (user.role !== "Student" && user.role !== "Admin") {
			throw new Error("Do not have permission to access this resource");
		}

		request.authToken = authToken;
		request.user = user;

		logger.info(`Authentication Token for ID ${user._id} is Accepted`);
		next();
	} catch (error) {
		logger.warn(error.message);
		return request.handleResponse.unauthorizedRespond(response)(error.message);
	}
};
