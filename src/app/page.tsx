import factory from "@ethereum//factory";
import CampaignsList from '@/components/CampaignsList';
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  try {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return (
      <>
        <div className="flex justify-end">
          <Link href="/campaigns/new">
            <Button>
              <CirclePlus /> Create Campaign
            </Button>
          </Link>
        </div>
        <CampaignsList campaigns={campaigns} />
      </>

    );


  } catch (error: any) {
    return (
      <div>
        Error loading campaigns: {error.message}
      </div>
    );
  }
}