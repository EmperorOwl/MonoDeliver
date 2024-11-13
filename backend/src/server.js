require("dotenv").config(); // Load the environment variables into process.env

const http = require("http");

const app = require("./app");
const { createSocket } = require("./socket");
const { connectDatabase } = require("./db");
const { PORT_NUMBER, MONGO_URL } = require("./config");

// Server ---------------------------------------------------------------------

const server = http.createServer(app);

createSocket(server);

server.listen(PORT_NUMBER, async () => {
    console.log(`Listening on port ${PORT_NUMBER}`);
    await connectDatabase(MONGO_URL + "/prod");
});
