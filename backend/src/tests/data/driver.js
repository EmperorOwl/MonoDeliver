const validDrivers = [
    {
        name: "Tester",
        department: "food",
        licence: "ABC12",
        isActive: false,
    },
    {
        name: "Joe",
        department: "furniture",
        licence: "4ZyXd",
        isActive: true,
    },
    {
        name: "superlongtester",
        department: "electronic",
        licence: "xxxxx",
        isActive: false,
    },
];

const invalidNames = [
    ["Te", "is too short"],
    ["Super Extra Long Tester", "is too long"],
    ["Tester McTester", "has a space"],
    ["Tester1", "has a number"],
];

const invalidDepartments = [
    ["clothes", "does not exist"],
    ["Food", "is capitalised"],
    ["food  ", "has trailing whitespace"],
    ["electronics", "is pluralised"],
];

const invalidLicences = [
    ["1234", "is too short"],
    ["123456", "is too long"],
    ["12AB$", "contains symbols"],
];

module.exports = {
    validDrivers,
    invalidNames,
    invalidDepartments,
    invalidLicences,
};
