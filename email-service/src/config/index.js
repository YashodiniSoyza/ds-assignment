const config = {
	PORT: process.env.PORT || 5000,
	ENV: process.env.NODE_ENV || "DEV",
	DB_CONNECTION_STRING: process.env.MONGODB_URL,
};

export default config;
