const socketIo = require("socket.io");

const { translateText } = require("./google-apis/translate");
const { convertText } = require("./google-apis/convert");
const { calculateDistance } = require("./google-apis/calculate");

function createSocket(server) {
    const io = socketIo(server, { cors: { origin: "http://localhost:4200" } });

    io.on("connection", (socket) => {
        // New Translation
        socket.on("newTranslation", async (req) => {
            const res = await translateText(req);
            socket.emit("translation", res);
        });

        // New Conversion
        socket.on("newConversion", async (req) => {
            const res = await convertText(req);
            socket.emit("conversion", res);
        });

        // New Calculation
        socket.on("newCalculation", async (req) => {
            const res = await calculateDistance(req);
            socket.emit("calculation", res);
        });
    });
}

module.exports = { createSocket };
