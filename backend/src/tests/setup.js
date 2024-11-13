const app = require("../app");
const { connectDatabase, dropDatabase, closeDatabase } = require("../db");
const { MONGO_URL } = require("../config");

let server;

/**
 * Starts the server on a random available port and resets the database before
 * running the tests.
 */
beforeAll(async () => {
    server = app.listen(0, async () => {
        app.locals.username = "AutoTester"; // Fake user to bypass login.
        console.log(`Test server running on port ${server.address().port}`);
        await connectDatabase(MONGO_URL + "/test");
        await dropDatabase();
    });
});

/**
 * Closes the server and database connection after running all the tests.
 */
afterAll(async () => {
    await new Promise((resolve, reject) => {
        server.close(async () => {
            console.log("Test server closed");
            await closeDatabase();
            resolve();
        });
    });
});

module.exports = server;
