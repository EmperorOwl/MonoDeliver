const express = require("express");
const cors = require("cors");
const path = require("path");

const loggerMiddleware = require("./utils/logger");
const authMiddleware = require("./utils/auth");
const authRouter = require("./routes/auth");
const driverRouter = require("./routes/driver");
const packageRouter = require("./routes/package");
const { getStats } = require("./utils/stats");
const { DRIVER_URL, PACKAGE_URL, AUTH_URL, STATS_URL } = require("./config");

/**
 * The Express application.
 * @const
 */
const app = express();

// Frontend --------------------------------------------------------------------

app.use("/", express.static(path.join("../frontend/dist/frontend/browser")));

// Middleware ------------------------------------------------------------------

app.use(express.json()); // Parses JSON data.
// app.use(cors()); // Enables access from frontend server.
app.use(loggerMiddleware); // Logs requests.
app.use(authMiddleware); // Handles authentication of users.

// Routing ---------------------------------------------------------------------

app.use(DRIVER_URL, driverRouter); // Driver API routes.
app.use(PACKAGE_URL, packageRouter); // Driver API routes.
app.use(AUTH_URL, authRouter); // Authentication API routes.
app.get(STATS_URL, async (req, res) => res.json(await getStats())); // Stats.

module.exports = app;
