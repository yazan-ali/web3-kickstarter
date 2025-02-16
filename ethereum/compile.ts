const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
// Remove build folder if it exists
fs.removeSync(buildPath);
// Create build folder
fs.ensureDirSync(buildPath);

// Get path to Campaign.sol contract
const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
// Read Campaign.sol contract
const source = fs.readFileSync(campaignPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
        "Campaign.sol": {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    "Campaign.sol"
];

// Write each contract to the build directory
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}