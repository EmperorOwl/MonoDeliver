/**
 * Defines the routes for package CRUD operations.
 * @module packages
 */

const express = require("express");
const controller = require("../controllers/package");

/**
 * The Express router.
 * @const
 */
const router = express.Router();

/**
 * Route serving the creation of a package.
 * @name / post
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.post("/", controller.createOne);

/**
 * Route serving the retrieval of packages.
 * @name / get
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.get("/", controller.retrieveAll);

/**
 * Route serving the update of a package.
 * @name / patch
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.patch("/", controller.updateOne);

/**
 * Route serving the deletion of a package.
 * @name /:id delete
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.delete("/:id", controller.deleteOne);

module.exports = router;
