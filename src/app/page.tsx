import factory from "@ethereum//factory";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import startup from "../../public/startup.svg";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Shield, Globe, Lock } from "lucide-react";
import CampaignCarousel from "@/components/CampaignCarousel";

export default async function Home() {
  try {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return (
      <div className="w-full px-4 overflow-x-hidden">
        <section className="min-h-screen flex flex-col items-center text-center -mt-6 dark:from-zinc-950 dark:to-zinc-900">
          <div className="max-w-4xl mx-auto">
            <Image
              src={startup}
              alt="Decentralized Crowdfunding"
              width={500}
              height={300}
              className="mb-8 mx-auto"
              priority
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-blue-400 mb-6">
              Decentralized Crowdfunding for the Future
            </h1>
            <p className="text-xl text-gray-600 mb-8 dark:text-zinc-300">
              Launch your dreams with blockchain-powered crowdfunding.
              Transparent, secure, and borderless.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/campaigns/new">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start a Campaign
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-700 text-purple-700 hover:text-purple-700 dark:border-0 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                >
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24 bg-white dark:bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit">
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    Secure & Transparent
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Smart contracts ensure your funds are secure and every
                    transaction is recorded on the blockchain for complete
                    transparency.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit">
                    <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    Global Reach
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with backers worldwide. No borders, no limitations.
                    Your project can reach supporters anywhere.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    Easy to Use
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simple interface makes it easy to create and manage
                    campaigns, even if you're new to Web3.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-6 dark:bg-zinc-900">
                <CardContent className="pt-6">
                  <div className="mb-4 bg-purple-100 dark:bg-purple-900 p-3 rounded-full w-fit">
                    <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    Scam Prevention
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contributors have full control over fund usage. Every
                    payment request requires community approval, ensuring
                    transparent and responsible spending.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">
              Featured Campaigns
            </h2>
            <CampaignCarousel campaigns={campaigns.slice(0, 5)} />
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-r from-purple-600/80 to-blue-600/80 dark:from-zinc-900 dark:to-zinc-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Launch Your Campaign?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of creators who have successfully funded their
              projects through our platform.
            </p>
            <Link href="/campaigns/new">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 dark:bg-white dark:text-black"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  } catch (error: any) {
    return <div>Error loading campaigns: {error.message}</div>;
  }
}
