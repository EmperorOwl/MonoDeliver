/**
 * Handles auth operations.
 * @module authController
 */

const { Request, Response } = require("express");

const db = require("../firebase");

/**
 * Reference to the users collection in the database.
 * @const
 */
const collRef = db.collection("users");

/**
 * Checks username and password before logging user in.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Validate inputs.
    let errMsg;
    if (!username || !password) {
        errMsg = "All fields must be filled";
    } else {
        const doc = await collRef.doc(username).get();
        if (!doc.exists) {
            errMsg = "Username does not exist";
        } else if (password !== doc.data().password) {
            errMsg = "Password does not match";
        }
    }
    // Process result.
    if (errMsg) {
        res.status(400).json(`Login Failed: ${errMsg}`);
    } else {
        req.app.locals.username = username; // Logs the user in.
        res.json("Login Successful");
    }
};

/**
 * Registers a new user with a username and password.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const registerUser = async (req, res) => {
    const { username, password, password2 } = req.body;
    // Validate inputs.
    let errMsg;
    if (!username || !password || !password2) {
        errMsg = "All fields must be filled";
    } else if ((await collRef.doc(username).get()).exists) {
        errMsg = "User already exists";
    } else if (username.length < 6) {
        errMsg = "Username must be at least 6 characters long";
    } else if (!/^[A-Za-z0-9]+$/.test(username)) {
        errMsg = "Username must be alphanumeric";
    } else if (password.length < 5 || password.length > 10) {
        errMsg = "Password must be between 5 and 10 characters long";
    } else if (password !== password2) {
        errMsg = "Passwords do not match";
    }
    // Process result.
    if (errMsg) {
        res.status(400).json(`Registration Failed: ${errMsg}`);
    } else {
        await collRef.doc(username).set({ password: password });
        res.json("Registration Successful");
    }
};

module.exports = {
    loginUser,
    registerUser,
};
