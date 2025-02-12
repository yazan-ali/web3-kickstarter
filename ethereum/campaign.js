import web3 from "./web3";
import Campaign from './build/Campaign.json';

const getCampaign = (address) => {
    let campaign = new web3.eth.Contract(
        JSON.parse(Campaign.abi),
        address
    );

    return campaign;
}

export { getCampaign };