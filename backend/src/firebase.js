const admin = require("firebase-admin");

const serviceAccount = require("../service-account.json"); // Private key

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

module.exports = db;
