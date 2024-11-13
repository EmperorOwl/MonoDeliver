/**
 * Handles package CRUD operations.
 * @module packageController
 */

const { Request, Response } = require("express");
const mongoose = require("mongoose");

const Package = require("../models/package");
const Driver = require("../models/driver");
const {
    incrementCreate,
    incrementRetrieve,
    incrementUpdate,
    incrementDelete,
} = require("../utils/stats");

/**
 * Creates a new package using the data received in the request body.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const createOne = async (req, res) => {
    try {
        const doc = new Package({ ...req.body });
        await doc.save();
        if (req.body.driverId) {
            const driver = await Driver.findById(req.body.driverId);
            driver.assignedPackages.push(doc._id);
            driver.save();
        }
        res.status(201).json({ _id: doc._id, id: doc.id });
        await incrementCreate();
    } catch (err) {
        res.status(400).json(err);
    }
};

/**
 * Retrieves all packages.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const retrieveAll = async (req, res) => {
    try {
        const docs = await Package.find().populate("driverId");
        res.status(200).json(docs);
        await incrementRetrieve();
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Updates an existing package.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const updateOne = async (req, res) => {
    if (!mongoose.isValidObjectId(req.body._id)) {
        return res.status(400).json("Invalid MongoDB ID");
    }
    try {
        const doc = await Package.findOneAndUpdate(
            { _id: req.body._id },
            { destination: req.body.destination },
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
 * Deletes an existing package.
 * ID can be either the MongoDB one or the custom one.
 * @param {Request} req - the HTTP request object
 * @param {Response} res - the HTTP response object
 */
const deleteOne = async (req, res) => {
    try {
        let parcel;
        if (!mongoose.isValidObjectId(req.params.id)) {
            parcel = await Package.findOne({ id: req.params.id });
        } else {
            parcel = await Package.findById(req.params.id);
        }
        let result;
        if (parcel) {
            const driver = await Driver.findById(parcel.driverId);
            if (driver) {
                driver.assignedPackages.splice(
                    driver.assignedPackages.indexOf(parcel._id),
                    1
                );
                driver.save();
            }
            result = await Package.deleteOne({ _id: parcel._id });
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
