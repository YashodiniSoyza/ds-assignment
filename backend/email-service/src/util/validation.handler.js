import { validationResult } from "express-validator";

// Function to handle validation errors
const handleValidationErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next(); // Proceed to the next middleware or route handler
};

export default handleValidationErrors;
