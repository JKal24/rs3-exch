const admin = require('firebase-admin');
const accountKeys = require('../ServiceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(accountKeys)
});

const db = admin.firestore();

module.exports = { admin, db };