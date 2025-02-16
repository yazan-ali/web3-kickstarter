import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import search from "../../../public/search.svg";
import { Wallet, Users, FileText, Plus } from "lucide-react";
import Link from "next/link";
import CampaignsList from "@/components/CampaignsList";

function Campaigns() {
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
          <CampaignsList />
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
