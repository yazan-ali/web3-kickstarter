const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const CampaignFactory = require("./build/CampaignFactory.json");
require('dotenv').config({ path: '.env.local' });

const provider = new HDWalletProvider(
    process.env.NEXT_PUBLIC_METAMASK_MNEMONIC,
    process.env.NEXT_PUBLIC_SEPOLIA_INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(CampaignFactory.abi)
        .deploy({ data: CampaignFactory.evm.bytecode.object })
        .send({ gas: "3000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
}

deploy();
