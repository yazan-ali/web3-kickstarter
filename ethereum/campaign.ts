import web3 from "./web3";
import Campaign from './build/Campaign.json';

const getCampaign = (address: string) => {
    let campaign = new web3.eth.Contract(Campaign.abi, address);

    return campaign;
}

export { getCampaign };