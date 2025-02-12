import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contract = new web3.eth.Contract(
    CampaignFactory.abi,
    process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS
);

export default contract;