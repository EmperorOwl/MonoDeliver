/**
 * Defines the routes for driver CRUD operations.
 * @module drivers
 */

const express = require("express");
const controller = require("../controllers/driver");

/**
 * The Express router.
 * @const
 */
const router = express.Router();

/**
 * Route serving the creation of a driver.
 * @name / post
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.post("/", controller.createOne);

/**
 * Route serving the retrieval of drivers.
 * @name / get
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.get("/", controller.retrieveAll);

/**
 * Route serving the update of a driver.
 * @name / patch
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.patch("/", controller.updateOne);

/**
 * Route serving the deletion of a driver.
 * @name /:id delete
 * @function
 * @param {string} path - the Express path
 * @param {Function} callback - the Express callback
 */
router.delete("/:id", controller.deleteOne);

module.exports = router;
