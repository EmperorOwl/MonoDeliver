const validPackages = [
    {
        title: "Books",
        weight: 1.5,
        destination: "NewYork",
        description: "Urgent delivery!", // Checks description allows special.
        isAllocated: true,
    },
    {
        title: "Laptop",
        weight: 2.3,
        destination: "SanFran",
        description: "Handle with care",
        isAllocated: false,
    },
    {
        title: "Clothes",
        weight: 0.9, // Checks weight in between 0 and 1.
        destination: "Chicago",
        description: "Price $199.99",
        isAllocated: true,
    },
    {
        title: "Furniture",
        weight: 78,
        destination: "Houston2", // Number in destination.
        description: "Large package",
        isAllocated: false,
    },
    {
        title: "SonyXM4",
        weight: 3.2,
        destination: "Seattle",
        description: "", // Checks description is optional.
        isAllocated: true,
    },
];

const invalidTitles = [
    ["CD", "is too short"],
    ["CustomisedKitchenApplianceSet", "is too long"],
    ["cool clothes", "has a space"],
];

const invalidWeights = [
    [0, "is zero"],
    [-10.7, "is negative"],
];

const invalidDestinations = [
    ["NY", "is too short"],
    ["VeryLongCityNameExceedingLimit", "is too long"],
    ["Gold Coast", "has a space"],
    ["@Sydney", "contains special characters"],
];

const invalidDescriptions = [
    ["very long description that exceeds the limit", "is too long"],
];

module.exports = {
    validPackages,
    invalidTitles,
    invalidWeights,
    invalidDestinations,
    invalidDescriptions,
};
