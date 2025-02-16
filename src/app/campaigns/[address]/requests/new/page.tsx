"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useParams } from "next/navigation";
import { getCampaign } from "@ethereum/campaign";
import web3 from "@ethereum/web3";
import Link from "next/link";

function CreateRequestForm() {
  const params = useParams();
  const { address } = params;

  const onSubmit = async (values: any) => {
    let campaign = getCampaign(address as string);
    let accounts = await web3.eth.getAccounts();
    await campaign.methods
      .createRequest(
        values.description,
        web3.utils.toWei(values.value, "ether"),
        values.recipient
      )
      .send({ from: accounts[0] });
    reset();
  };

  const {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    reset,
  } = useForm({
    initialValues: {
      description: "",
      value: "",
      recipient: "",
    },
    onSubmit,
  });

  const { description, value, recipient } = values;
  const { descriptionError, valueError, recipientError } = errors;

  return (
    <Card className="container px-4 sm:px-0 mx-auto dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-center">Create Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="request-description" className="font-semibold">
                Description
              </Label>
              <Textarea
                id="request-description"
                className="dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="request-value" className="font-semibold">
                Amount in Ether
              </Label>
              <div className="flex">
                <Input
                  id="request-value"
                  className="outline-none dark:bg-zinc-800 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                  name="value"
                  value={value}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  disabled
                  className="disabled:opacity-100 rounded-l-none"
                >
                  ether
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="request-recipient" className="font-semibold">
                Recipient
              </Label>
              <Input
                id="request-recipient"
                className="dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                name="recipient"
                value={recipient}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between">
            {isSubmitting ? (
              <Button disabled className="my-4">
                Creating request in progress{" "}
                <Loader2 className="animate-spin" />
              </Button>
            ) : (
              <Button type="submit" className="my-4">
                Create Pay Request
              </Button>
            )}
            <Link href={`/campaigns/${address}/requests`}>
              <Button type="button" variant="outline" className="my-4">
                Back
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Somthing went wrong while creating the request.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}

export default CreateRequestForm;
