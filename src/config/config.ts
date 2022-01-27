if (process.env.NODE_ENV === undefined) {
  require("dotenv").config();
}

const URI = encodeURI(<string>process.env.MONGODB_URI);

const config = {
  mongoDbUri: URI,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  apiKey: process.env.API_KEY,
};

export { config };
