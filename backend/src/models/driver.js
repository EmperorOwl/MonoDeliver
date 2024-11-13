const mongoose = require("mongoose");

const { getRandDigit, getRandChar } = require("../utils/random");
const {
    checkLength,
    checkChoice,
    checkAlphabetic,
    checkAlphanumeric,
} = require("../utils/validate");
const { STUD_ID_FIRST_2 } = require("../config");

/**
 * Generates a random driver ID.
 * @returns {string}
 */
function generateDriverId() {
    return `D${getRandDigit(2)}-${STUD_ID_FIRST_2}-${getRandChar(3)}`;
}

/**
 * Valid driver departments.
 * @constant
 */
VALID_DEPARTMENTS = ["food", "furniture", "electronic"];

/**
 * Defines the structure and validation rules for driver documents in the
 * MongoDB database.
 */
const driverSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            default: generateDriverId,
            immutable: true,
        },
        name: {
            type: String,
            required: [true, "Driver name is required"],
            validate: [
                checkLength("Driver name", 3, 20),
                checkAlphabetic("Driver name"),
            ],
        },
        department: {
            type: String,
            required: [true, "Driver department is required"],
            validate: checkChoice("Driver department", VALID_DEPARTMENTS),
        },
        licence: {
            type: String,
            required: [true, "Driver licence is required"],
            validate: [
                checkLength("Driver licence", 5, 5),
                checkAlphanumeric("Driver licence"),
            ],
        },
        isActive: {
            type: Boolean,
            required: [true, "Driver isActive is required"],
        },
        assignedPackages: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Package",
            },
        ],
    },
    { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

Driver.VALID_DEPARTMENTS = VALID_DEPARTMENTS;

module.exports = Driver;
