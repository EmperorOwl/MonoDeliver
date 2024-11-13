const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database.
 * @param {String} url
 */
async function connectDatabase(url) {
    await mongoose.connect(url);
    console.log(`Connected to MongoDB database at ${url}`);
}

/**
 * Removes all collections and documents in the connected database.
 */
async function dropDatabase() {
    await mongoose.connection.dropDatabase();
    console.log("Database dropped");
}

/**
 * Disconnects from the MongoDB database.
 */
async function closeDatabase() {
    await mongoose.connection.close();
    console.log("Database connection closed");
}

module.exports = { connectDatabase, dropDatabase, closeDatabase };
