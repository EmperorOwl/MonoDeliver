const morgan = require("morgan");
const { LOG_FORMAT } = require("../config");

const loggerMiddleware = morgan(LOG_FORMAT, {
    skip: (req, res) => req.method === "OPTIONS",
});

module.exports = loggerMiddleware;
