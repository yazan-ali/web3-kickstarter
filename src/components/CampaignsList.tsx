import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


function CampaignsList({ campaigns }: { campaigns: string[] }) {
    return (
        <>
            <h1 className='text-2xl font-bold my-4'>Open Campaigns</h1>
            <div className='flex flex-col gap-4'>
                {
                    campaigns.map((address: string) =>
                        <Card key={address} className="hover:bg-zinc-100 dark:hover:bg-zinc-900">
                            <CardHeader>
                                <CardTitle>Campaign Address</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="break-words">{address}</p>
                            </CardContent>
                            <CardFooter>
                                <Button>
                                    <Link href={`/campaigns/${address}`}>View Campaign</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    )
                }
            </div>
        </>
    )
}


export default CampaignsList