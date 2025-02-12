import { getCampaign } from '@ethereum/campaign';
import Campaign from "@/components/Campaign";

export const dynamic = 'force-dynamic';

async function CampaignPage({ params }: { params: Promise<{ address: string }> }) {

    const address = (await params).address;

    try {
        let campaign = getCampaign(address);
        let result = await campaign.methods.getDetails().call();
        let campaignDetails = {
            address: address,
            name: result[0],
            description: result[1],
            img: result[2],
            minimumContribution: result[3],
            balance: result[4],
            requestsCount: result[5],
            approversCount: result[6],
            manager: result[7],
        }

        return (
            <Campaign campaignDetails={campaignDetails} />
        )
    } catch (err) {
        console.log(err);
    }
}

export default CampaignPage;