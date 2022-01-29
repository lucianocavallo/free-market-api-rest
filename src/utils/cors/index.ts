import cors from "cors";

const whitelist = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:8080",
  "https://free-market-restful-api.herokuapp.com",
];

const options: CorsOptions = {
  origin: (
    origin: string,
    callback: (param1: unknown, param2?: unknown) => string
  ) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("notallowed access"));
    }
  },
};

function corsApi() {
  return cors(options);
}

export { corsApi };
