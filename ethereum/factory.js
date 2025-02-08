import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const contract = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    process.env.NEXT_PUBLIC_CAMPAIGN_FACTORY_ADDRESS
);

export default contract;