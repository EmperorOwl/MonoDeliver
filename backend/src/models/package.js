const mongoose = require("mongoose");

const { getRandDigit, getRandChar } = require("../utils/random");
const { checkLength, checkAlphanumeric } = require("../utils/validate");
const { STUD_INITIALS } = require("../config");

/**
 * Generates a random package ID.
 * @returns {string}
 */
function generatePackageId() {
    return `P${getRandChar(2)}-${STUD_INITIALS}-${getRandDigit(3)}`;
}

/**
 * Defines the structure and validation rules for package documents in the
 * MongoDB database.
 */
const packageSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            default: generatePackageId,
            immutable: true,
        },
        title: {
            type: String,
            required: [true, "Package title is required"],
            validate: [
                checkLength("Package title", 3, 15),
                checkAlphanumeric("Package title"),
            ],
        },
        weight: {
            type: Number,
            required: [true, "Package weight is required"],
            validate: {
                validator: (num) => num > 0,
                message: "Package weight must be a positive non-zero number",
            },
        },
        destination: {
            type: String,
            required: [true, "Package destination is required"],
            validate: [
                checkLength("Package destination", 5, 15),
                checkAlphanumeric("Package destination"),
            ],
        },
        description: {
            type: String,
            validate: checkLength("Package description", 0, 30),
        },
        isAllocated: {
            type: Boolean,
            required: [true, "Package isAllocated is required"],
        },
        driverId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Driver",
        },
    },
    { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
