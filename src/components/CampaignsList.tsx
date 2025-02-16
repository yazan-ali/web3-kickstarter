"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import factory from "@ethereum/factory";
import { getCampaign } from "@ethereum/campaign";
import web3 from "@ethereum/web3";
import { Wallet, Users, FileText, ArrowDownCircle } from "lucide-react";
import Image from "next/image";

function CampaignsList() {
  const [campaigns, setCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsAddresses = await factory.methods
        .getDeployedCampaigns()
        .call();

      const campaigns = campaignsAddresses.map(async (address: string) => {
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

        return campaignDetails;
      });

      setCampaigns(await Promise.all(campaigns));
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {campaigns.map((campaign: any) => (
        <Card
          key={campaign.address}
          className="overflow-hidden dark:bg-zinc-900"
        >
          <div className="flex flex-col md:flex-row">
            <Image
              src={campaign.img}
              alt={campaign.name}
              width={1000}
              height={600}
              className="w-full md:w-2/4"
            />
            <CardContent className="flex-1 p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    Campaign Address: {campaign.address}
                  </p>
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-300 mb-4 line-clamp-4">
                {campaign.description}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <Wallet className="h-4 w-4 mr-2" />
                    <span>
                      Balance: {web3.utils.fromWei(campaign.balance, "ether")}{" "}
                      ETH
                    </span>
                  </div>
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Contributors: {campaign.approversCount}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Requests: {campaign.requestsCount}</span>
                  </div>
                  <div className="flex items-center text-zinc-600 dark:text-zinc-300">
                    <ArrowDownCircle className="h-4 w-4 mr-2" />
                    <span>
                      Min. Contribution: {campaign.minimumContribution} wei
                    </span>
                  </div>
                </div>
              </div>
              <Link href={`/campaigns/${campaign.address}`}>
                <Button variant="outline" className="my-4">
                  View Campaign
                </Button>
              </Link>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default CampaignsList;
