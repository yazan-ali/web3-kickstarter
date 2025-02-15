import { useEffect, useState } from "react";
import { getCampaign } from "@ethereum/campaign";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Wallet, ArrowDown } from "lucide-react";
import Image from "next/image";
import web3 from "web3";
import Link from "next/link";

function CampaignCard({ address }: { address: string }) {
  const [campaignDetails, setCampaignDetails] = useState<any>(null);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
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
        };

        setCampaignDetails(campaignDetails);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCampaignDetails();
  }, [address]);

  if (!campaignDetails) return null;

  return (
    <Card
      key={campaignDetails.address}
      className="overflow-hidden mx-auto dark:bg-zinc-900"
    >
      <Image
        src={campaignDetails.img}
        alt={`Campaign ${campaignDetails.name}`}
        className="w-full"
        width={300}
        height={300}
      />
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2 dark:text-white">
          {campaignDetails.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-4">
          {campaignDetails.description}
        </p>

        <Separator className="my-4" />

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Wallet className="h-4 w-4 mr-2" />
              <span>Current Balance (ether)</span>
            </div>
            <span className="dark:text-white">
              {web3.utils.fromWei(campaignDetails.balance, "ether")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="h-4 w-4 mr-2" />
              <span>Contributors</span>
            </div>
            <span className="dark:text-white">
              {campaignDetails.approversCount}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <ArrowDown className="h-4 w-4 mr-2" />
              <span>Min. Contribution (wei)</span>
            </div>
            <span className="dark:text-white">
              {campaignDetails.minimumContribution}
            </span>
          </div>
        </div>
        <Link href={`/campaigns/${campaignDetails.address}`}>
          <Button variant="outline" className="w-full">
            View Campaign
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CampaignCard;
