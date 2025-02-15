"use client";
import { useState, useEffect } from "react";
import factory from "@ethereum//factory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import search from "../../../public/search.svg";
import {
  Wallet,
  Users,
  FileText,
  User,
  Plus,
  ExternalLink,
  ArrowDownCircle,
} from "lucide-react";
import { getCampaign } from "@ethereum/campaign";
import Link from "next/link";
import web3 from "@ethereum/web3";

function Campaigns() {
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
    <div className="w-full">
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 pb-12 dark:from-zinc-950 dark:to-zinc-900">
        <div className="max-w-4xl mx-auto">
          <Image
            src={search}
            alt="Explore Campaigns"
            width={500}
            height={300}
            className="mb-8 mx-auto"
            priority
          />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 dark:from-purple-400 dark:to-blue-400">
            Discover Amazing Campaigns
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8">
            Support innovative projects and be part of something extraordinary.
            Every campaign is verified and secure.
          </p>
          <Link href="/campaigns/new">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Create Campaign
              <Plus />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Active Campaigns
          </h2>
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
                    width={192}
                    height={192}
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
                            Balance:{" "}
                            {web3.utils.fromWei(campaign.balance, "ether")} ETH
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
                            Min. Contribution: {campaign.minimumContribution}{" "}
                            wei
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
        </div>
      </section>

      <section className="py-16 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center dark:text-white">
            Platform Statistics
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center dark:bg-zinc-800">
              <CardContent>
                <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mx-auto">
                  <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  100+ ETH
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Total Funds Raised
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center dark:bg-zinc-800">
              <CardContent>
                <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mx-auto">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  500+
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Successful Campaigns
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center dark:bg-zinc-800">
              <CardContent>
                <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit mx-auto">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-2 dark:text-white">
                  1000+
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Active Contributors
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Campaigns;
