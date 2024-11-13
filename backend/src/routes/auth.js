/**
 * Defines the routes for auth-related operations.
 * @module authRouter
 */

const express = require("express");
const controller = require("../controllers/auth");

/**
 * The Express router.
 * @const
 */
const router = express.Router();

/**
 * Route serving the sign in of a user.
 * @name /auth/login post
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.post("/login", controller.loginUser);

/**
 * Route serving the sign up of a user.
 * @name /auth/register post
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.post("/register", controller.registerUser);

module.exports = router;
