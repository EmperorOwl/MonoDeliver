/**
 * Handles driver CRUD operations.
 * @module driverController
 */

const { Request, Response } = require("express");
const mongoose = require("mongoose");

const Driver = require("../models/driver");
const Package = require("../models/package");
const {
    incrementCreate,
    incrementRetrieve,
    incrementUpdate,
    incrementDelete,
} = require("../utils/stats");

/**
 * Creates a new driver using the data received in the request body.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const createOne = async (req, res) => {
    try {
        const doc = new Driver({ ...req.body });
        await doc.save();
        res.status(201).json({ _id: doc._id, id: doc.id });
        await incrementCreate();
    } catch (err) {
        res.status(400).json(err);
    }
};

/**
 * Retrieves all drivers.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const retrieveAll = async (req, res) => {
    let filter = {};
    if (Driver.VALID_DEPARTMENTS.includes(req.query.department)) {
        filter = { department: req.query.department };
    }
    try {
        const docs = await Driver.find(filter).populate("assignedPackages");
        res.status(200).json(docs);
        await incrementRetrieve();
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Updates an existing driver.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const updateOne = async (req, res) => {
    if (!mongoose.isValidObjectId(req.body._id)) {
        return res.status(400).json("Invalid MongoDB ID");
    }
    try {
        const doc = await Driver.findOneAndUpdate(
            { _id: req.body._id },
            { department: req.body.department, licence: req.body.licence },
            { runValidators: true }
        );
        if (!doc) {
            return res.status(400).json("ID not found");
        }
        res.status(200).json("Update successful");
        await incrementUpdate();
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Deletes an existing driver.
 * ID can be either the MongoDB one or the custom one.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const deleteOne = async (req, res) => {
    try {
        let driver;
        if (!mongoose.isValidObjectId(req.params.id)) {
            driver = await Driver.findOne({ id: req.params.id });
        } else {
            driver = await Driver.findById(req.params.id);
        }
        let result;
        if (driver) {
            await Package.deleteMany({ driverId: driver._id });
            result = await Driver.deleteOne({ _id: driver._id });
            await incrementDelete();
        } else {
            result = {
                acknowledged: true,
                deletedCount: 0,
            };
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = {
    createOne,
    retrieveAll,
    updateOne,
    deleteOne,
};
