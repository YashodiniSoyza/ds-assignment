import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "University Management System API",
			version: "1.0.0",
			description: "API documentation for University Management System",
		},
	},
	apis: ["./src/api/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
