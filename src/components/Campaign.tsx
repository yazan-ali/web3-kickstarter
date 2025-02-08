import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"
import Image from "next/image";
import web3 from "../../ethereum/web3";
import StatCard from "./StateCard";

interface CampaignProps {
    campaign: {
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

function Campaign({ campaign }: CampaignProps) {
    if (!campaign) return;

    return (
        <div className="mb-10">
            <Card className="flex flex-col lg:flex-row shadow-xl rounded-2xl">
                <CardHeader className="flex flex-col lg:w-2/4">
                    <CardTitle>
                        <h1>{campaign.name}</h1>
                    </CardTitle>
                    <CardDescription className="break-words">
                        The owener of this campaign is {campaign.manager}
                    </CardDescription>
                    <div className="py-4">
                        <Image
                            src={campaign.img}
                            alt={campaign.name}
                            width={600}
                            height={600}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                    <CardDescription className="text-center lg:text-start">{campaign?.description}</CardDescription>
                </CardHeader>
                <div className="my-4">
                    <Separator orientation="vertical" />
                </div>
                <div className="space-y-1.5 py-6 lg:w-2/4">
                    <CardContent>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <StatCard
                                // title={web3.utils.fromWei(campaign.balance, " ether")}
                                title={campaign.balance}
                                meta="Campaign Balance (ether)"
                                description="The balance is how much money this campaign has left to spend."
                                className="bg-blue-100 dark:bg-blue-900/50"
                            />
                            <StatCard
                                title={campaign.minimumContribution}
                                meta="Minimum Contribution (wei)"
                                description="You must contribute at least this much wei to become an approver."
                                className="bg-violet-100 dark:bg-violet-900/50"
                            />
                            <StatCard
                                title={campaign.requestsCount}
                                meta="Number of Requests"
                                description="A request tries to withdraw money from the contract. Requests must be approved by approvers."
                                className="bg-sky-100 dark:bg-sky-900/50"
                            />
                            <StatCard
                                title={campaign.approversCount}
                                meta="Number of Approvers"
                                description="Number of people who have already contributed to this campaign."
                                className="bg-indigo-100 dark:bg-indigo-900/50"
                            />
                        </div>
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
                                <form>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="contribution" className="font-semibold">Contribution Amount</Label>
                                            <div className="flex">
                                                <Input
                                                    id="contribution"
                                                    className="outline-none dark:bg-zinc-800 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                                                    name="contribution"
                                                // value={contribution}
                                                // onChange={handleChange}
                                                />
                                                <Button type="button" disabled className="disabled:opacity-100 rounded-l-none">wei</Button>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        false ?
                                            <Button disabled className="my-4">
                                                {/* Creating campaign in progress <Loader2 className="animate-spin" /> */}
                                            </Button>
                                            :
                                            <Button type="submit" className="my-4">
                                                Contribute
                                            </Button>
                                    }
                                </form>
                            </CardContent>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </div>
    )
}

export default Campaign;