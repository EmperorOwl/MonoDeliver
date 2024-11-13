const request = require("supertest");

const app = require("../app");
const { PACKAGE_URL: URL } = require("../config");
const { dropDatabase } = require("../db");
const Package = require("../models/package");
const {
    validPackages,
    invalidTitles,
    invalidWeights,
    invalidDestinations,
    invalidDescriptions,
} = require("./data/package");

require("./setup");

const test_create_package = (parcel, testDesc, shouldSucceed) => {
    test(testDesc, async () => {
        const res = await request(app).post(URL).send(parcel);
        if (shouldSucceed) {
            expect(res.statusCode).toBe(201);
            expect(res.body._id).not.toBeNull(); // MongoDB ID
            expect(res.body.id).not.toBeNull(); // Driver ID
        } else {
            expect(res.statusCode).toBe(400);
        }
    });
};

const test_list_packages = (count) => {
    test(`no. of packages === ${count}`, async () => {
        const res = await request(app).get(URL);
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(count);
    });
};

const test_delete_existing_package = () => {
    test(`delete existing package`, async () => {
        const doc = await Package.findOne();
        const res = await request(app).delete(`${URL}/${doc.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(1);
    });
};

const test_delete_non_existent_package = () => {
    test(`delete non existent package`, async () => {
        const id = "testID";
        const res = await request(app).delete(`${URL}/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.deletedCount).toBe(0);
    });
};

const test_update_existing_package = () => {
    test(`update existing package`, async () => {
        const doc = await Package.findOne();
        const data = {
            _id: doc._id,
            destination: "Perth",
        };
        const res = await request(app).patch(URL).send(data);
        expect(res.statusCode).toBe(200);
    });
};

describe("Create valid packages", () => {
    // Create packages.
    validPackages.forEach((parcel) => {
        const testDesc = JSON.stringify(parcel);
        test_create_package(parcel, testDesc, true);
    });
    test_list_packages(validPackages.length);

    // Delete existing package.
    test_delete_existing_package();
    test_list_packages(validPackages.length - 1);

    // Delete non existent package.
    test_delete_non_existent_package();
    test_list_packages(validPackages.length - 1);

    // Update existing package.
    test_update_existing_package();
});

describe("Create invalid packages", () => {
    beforeAll(async () => await dropDatabase());

    const attributeToTests = {
        title: invalidTitles,
        weight: invalidWeights,
        destination: invalidDestinations,
        description: invalidDescriptions,
    };

    Object.entries(attributeToTests).forEach(([attribute, tests]) => {
        tests.forEach(([value, reason]) => {
            // Create a new package copying the first valid package.
            let parcel = JSON.parse(JSON.stringify(validPackages[0]));
            // Update one of its attributes to an invalid value.
            parcel[attribute] = value;
            // Run a test.
            const testDesc = `package ${attribute} ${reason} - "${value}"`;
            test_create_package(parcel, testDesc, false);
        });
    });

    test_list_packages(0);
});
