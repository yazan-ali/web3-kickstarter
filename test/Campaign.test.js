const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const Campaign = require("../ethereum/build/Campaign.json");
const CampaignFactory = require("../ethereum/build/CampaignFactory.json");

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(CampaignFactory.abi)
        .deploy({ data: CampaignFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "3000000" });

    await factory.methods.createCampaign("test", "test campaign", "test image", "100").send({ from: accounts[0], gas: "2000000" });
    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];
    campaign = new web3.eth.Contract(Campaign.abi, campaignAddress);
});

describe("Campaigns", () => {
    it("should deploy factory and campaign contracts", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("marks caller the manager of the campaign", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it("should allow people to contribute to the campaign and make the contributor as approver", async () => {
        await campaign.methods.contribute().send({ from: accounts[1], value: "200" });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        const approversCount = await campaign.methods.approversCount().call();
        assert(isContributor);
        assert.equal(approversCount, 1);
    });

    it("should requiers minimum contribution", async () => {
        try {
            await campaign.methods.contribute().send({ from: accounts[1], value: "50" });
        } catch (err) {
            assert(err);
        }
    });

    it("should allow the manager to make a pay request", async () => {
        await campaign.methods.createRequest("Buy a new computer", "100000000000", accounts[2]).send({
            from: accounts[0],
            gas: "1000000",
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal(request.description, "Buy a new computer");
        assert.equal(request.value, "100000000000");
        assert.equal(request.recipient, accounts[2]);
        assert.equal(request.approvalCount, 0);
        assert.equal(request.complete, false);
    });

    it("should process requests", async () => {
        // gett the balance of the recipient before the request is processed
        let oldBalance = await web3.eth.getBalance(accounts[2]);
        oldBalance = web3.utils.fromWei(oldBalance, "ether");
        oldBalance = parseFloat(oldBalance);

        await campaign.methods.contribute().send({ from: accounts[1], value: web3.utils.toWei("10", "ether") });
        await campaign.methods.createRequest("Buy a new computer", web3.utils.toWei("5", "ether"), accounts[2]).send({
            from: accounts[0],
            gas: "1000000",
        });

        await campaign.methods.approveRequest(0).send({ from: accounts[1], gas: "1000000" });
        await campaign.methods.finalizeRequest(0).send({ from: accounts[0], gas: "1000000" });
        const request = await campaign.methods.requests(0).call();
        assert.equal(request.complete, true);
        let balance = await web3.eth.getBalance(accounts[2]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        assert(balance >= oldBalance + 5,);
    });
});
