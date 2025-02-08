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

// Compile contracts
const output = solc.compile(source, 1).contracts;

// Write each contract to the build directory
for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}