import type { Metadata } from "next";
import { createCampaign } from '../../../../ethereum/campaign';
import Campaign from "@/components/Campaign";

async function CampaignPage({ params }: { params: Promise<{ address: string }> }) {

    const address = (await params).address;
    let campaingDetails;

    try {
        let campaing = createCampaign(address);
        let result = await campaing.methods.getDetails().call();
        campaingDetails = {
            name: result[0],
            description: result[1],
            img: result[2],
            minimumContribution: result[3],
            balance: result[4],
            requestsCount: result[5],
            approversCount: result[6],
            manager: result[7],
        }
    } catch (err) {
        console.log(err);
    }

    return (
        <Campaign campaign={campaingDetails} />
    )
}

export default CampaignPage;