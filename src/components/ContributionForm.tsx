'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import web3 from "@ethereum/web3";
import { getCampaign } from "@ethereum/campaign";
import { useRouter } from "next/navigation";

interface ContributionFormProps {
    address: string;
}

function ContributionForm({ address }: ContributionFormProps) {

    const router = useRouter();
    let campaign = getCampaign(address);

    const onSubmit = async (values: any) => {
        let accounts = await web3.eth.getAccounts();
        await campaign.methods.contribute().send({ from: accounts[0], value: web3.utils.toWei(values.contribution, "ether") });
        reset();
        router.refresh();
    };


    const { values, errors, isSubmitting, submitError, handleChange, handleSubmit, reset } = useForm({
        initialValues: {
            contribution: "",
        },
        onSubmit,
    });

    const { contribution } = values;
    const { contributionError } = errors;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="contribution" className="font-semibold">Amount to Contribute</Label>
                        <div className="flex">
                            <Input
                                id="contribution"
                                className="outline-none dark:bg-zinc-800 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                                name="contribution"
                                value={contribution}
                                onChange={handleChange}
                            />
                            <Button type="button" disabled className="disabled:opacity-100 rounded-l-none">ether</Button>
                        </div>
                    </div>
                </div>

                {
                    isSubmitting ?
                        <Button disabled className="my-4">
                            Loading <Loader2 className="animate-spin" />
                        </Button>
                        :
                        <Button type="submit" className="my-4">
                            Contribute
                        </Button>
                }
            </form>
            {submitError &&
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        Somthing went wrong while processing your request. Please try again.
                    </AlertDescription>
                </Alert>}
        </>
    )
}

export default ContributionForm