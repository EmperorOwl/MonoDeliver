const request = require("supertest");

const app = require("../app");
const { DRIVER_URL: URL } = require("../config");
const { dropDatabase } = require("../db");
const Driver = require("../models/driver");
const {
    validDrivers,
    invalidNames,
    invalidDepartments,
    invalidLicences,
} = require("./data/driver");

require("./setup");

const test_create_driver = (driver, testDesc, shouldSucceed) => {
    test(testDesc, async () => {
        const res = await request(app).post(URL).send(driver);
        if (shouldSucceed) {
            expect(res.statusCode).toBe(201);
            expect(res.body._id).not.toBeNull(); // MongoDB ID
            expect(res.body.id).not.toBeNull(); // Driver ID
        } else {
            expect(res.statusCode).toBe(400);
        }
    });
};

const test_list_drivers = (count) => {
    test(`no. of drivers === ${count}`, async () => {
        const res = await request(app).get(URL);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(count);
    });
};

const test_delete_existing_driver = () => {
    test(`delete existing driver`, async () => {
        const doc = await Driver.findOne();
        const res = await request(app).delete(`${URL}/${doc.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(1);
    });
};

const test_delete_non_existent_driver = () => {
    test(`delete non existent driver`, async () => {
        const id = "testID";
        const res = await request(app).delete(`${URL}/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(0);
    });
};

const test_update_existing_driver = () => {
    test(`update existing driver`, async () => {
        const doc = await Driver.findOne();
        const newLicence = "XYZ12";
        const newDepartment = "electronic";
        const data = {
            _id: doc._id,
            licence: newLicence,
            department: newDepartment,
        };
        const res = await request(app).patch(URL).send(data);
        expect(res.statusCode).toBe(200);
        const updatedDoc = await Driver.findById(doc._id);
        expect(updatedDoc.licence).toBe(newLicence);
        expect(updatedDoc.department).toBe(newDepartment);
    });
};

describe("Create valid drivers", () => {
    // Create drivers.
    validDrivers.forEach((driver) => {
        const testDesc = JSON.stringify(driver);
        test_create_driver(driver, testDesc, true);
    });
    test_list_drivers(validDrivers.length);

    // Delete existing driver.
    test_delete_existing_driver();
    test_list_drivers(validDrivers.length - 1);

    // Delete non existent driver.
    test_delete_non_existent_driver();
    test_list_drivers(validDrivers.length - 1);

    // Update existing driver.
    test_update_existing_driver();
});

describe("Create invalid drivers", () => {
    beforeAll(async () => await dropDatabase());

    const attributeToTests = {
        name: invalidNames,
        department: invalidDepartments,
        licence: invalidLicences,
    };

    Object.entries(attributeToTests).forEach(([attribute, tests]) => {
        tests.forEach(([value, reason]) => {
            // Create a new driver copying the first valid driver.
            let driver = JSON.parse(JSON.stringify(validDrivers[0]));
            // Update one of its attributes to an invalid value.
            driver[attribute] = value;
            // Run a test.
            const testDesc = `driver ${attribute} ${reason} - "${value}"`;
            test_create_driver(driver, testDesc, false);
        });
    });

    test_list_drivers(0);
});
