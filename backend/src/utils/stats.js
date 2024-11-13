const admin = require("firebase-admin");

const db = require("../firebase");

/**
 * Reference to the stats document under the data collection in the database.
 * @const
 */
const docRef = db.collection("data").doc("stats");

/**
 * Fetches the count of each CRUD operation from the database.
 * If the document doesn't exist, then it automatically creates one with
 * all zeroes.
 * @returns {Object} containing the CRUD stats
 */
async function getStats() {
    let doc = await docRef.get();
    if (!doc.exists) {
        await docRef.set({
            create: 0,
            retrieve: 0,
            update: 0,
            delete: 0,
        });
        doc = await docRef.get();
    }
    return doc.data();
}

/**
 * Increases the count of create operations by 1.
 */
async function incrementCreate() {
    await increment("create");
}

/**
 * Increases the count of retrieve operations by 1.
 */
async function incrementRetrieve() {
    await increment("retrieve");
}

/**
 * Increases the count of update operations by 1.
 */
async function incrementUpdate() {
    await increment("update");
}

/**
 * Increases the count of delete operations by 1.
 */
async function incrementDelete() {
    await increment("delete");
}

/**
 * Increases the count of the specified CRUD operation by 1.
 * @param {String} operation
 */
async function increment(operation) {
    await docRef.update({
        [operation]: admin.firestore.FieldValue.increment(1),
    });
}

module.exports = {
    getStats,
    incrementCreate,
    incrementRetrieve,
    incrementUpdate,
    incrementDelete,
};
