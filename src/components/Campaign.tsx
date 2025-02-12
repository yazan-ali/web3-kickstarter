import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import StatCard from "./StateCard";
import ContributionForm from "./ContributionForm";
import web3 from "@ethereum/web3";
import Link from "next/link";
interface CampaignProps {
    campaignDetails: {
        address: string;
        name: string;
        description: string;
        img: string;
        minimumContribution: string;
        balance: string;
        requestsCount: string;
        approversCount: string
        manager: string;
    } | undefined;
}

function Campaign({ campaignDetails }: CampaignProps) {
    if (!campaignDetails) return;

    let stateCards = [
        {
            title: web3.utils.fromWei(campaignDetails.balance, "ether"),
            meta: "Campaign Balance (ether)",
            description: "The balance is how much money this campaign has left to spend.",
            className: "bg-blue-100 dark:bg-blue-900/50"
        },
        {
            title: campaignDetails.minimumContribution,
            meta: "Minimum Contribution (wei)",
            description: "You must contribute at least this much wei to become an approver.",
            className: "bg-violet-100 dark:bg-violet-900/50"
        },
        {
            title: campaignDetails.requestsCount,
            meta: "Number of Requests",
            description: "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
            className: "bg-sky-100 dark:bg-sky-900/50"
        },
        {
            title: campaignDetails.approversCount,
            meta: "Number of Approvers",
            description: "Number of people who have already contributed to this campaign",
            className: "bg-indigo-100 dark:bg-indigo-900/50"
        },
    ];

    return (
        <div className="mb-10">
            <Card className="flex flex-col lg:flex-row shadow-xl rounded-2xl">
                <CardHeader className="flex flex-col lg:w-2/4">
                    <CardTitle>
                        <h1>{campaignDetails.name}</h1>
                    </CardTitle>
                    <CardDescription className="break-words">
                        The owener of this campaign is {campaignDetails.manager}
                    </CardDescription>
                    <div className="py-4">
                        <Image
                            src={campaignDetails.img}
                            alt={campaignDetails.name}
                            width={600}
                            height={600}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <CardDescription className="text-center lg:text-start">{campaignDetails.description}</CardDescription>
                </CardHeader>
                <div className="my-4">
                    <Separator orientation="vertical" />
                </div>
                <div className="space-y-1.5 py-6 lg:w-2/4">
                    <CardContent>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                stateCards.map((card, index) => (
                                    <StatCard key={index} {...card} />
                                ))
                            }
                        </div>
                        <Link href={`/campaigns/${campaignDetails.address}/requests`}>
                            <Button className=" w-full mt-4">
                                View Requests
                            </Button>
                        </Link>
                    </CardContent>
                    <CardFooter className="flex-col w-full text-start">
                        <Separator className="my-4" />
                        <div className="w-full">
                            <CardHeader>
                                <CardTitle className="text-center">
                                    <h3 className="text-lg font-bold">
                                        Contribute to this campaign
                                    </h3>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ContributionForm address={campaignDetails.address} />
                            </CardContent>
                        </div>
                    </CardFooter>
                </div>
            </Card >
        </div >
    )
}

export default Campaign;