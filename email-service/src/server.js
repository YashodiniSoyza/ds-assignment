import app from "./app.js";
import logger from "./util/logger.js";
import configs from "./config/index.js";

const PORT = configs.PORT;
const ENVIRONMENT = configs.ENV;

//Handle Root API Call
app.get("/", (req, res, next) => {
	res.send("<title>University Management System API</title><h2>Welcome to the University Management System API</h2>");
	next();
});

// Start the Server
app.listen(PORT, () => {
	logger.info(`Starting on ${ENVIRONMENT} Environment`);
	logger.info(`API Server up and running on PORT ${PORT}`);
});
