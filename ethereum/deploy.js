const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const CampaignFactory = require("./build/CampaignFactory.json");
require('dotenv').config({ path: '.env.local' });

const provider = new HDWalletProvider(
    process.env.METAMASK_MNEMONIC,
    process.env.SEPOLIA_INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(CampaignFactory.abi))
        .deploy({ data: CampaignFactory.evm.bytecode.object })
        .send({ gas: "2400000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address); // 0xfDa8a21e3d570B389B94789DCEaA3be9E04D1be4
    provider.engine.stop();
}

deploy();
