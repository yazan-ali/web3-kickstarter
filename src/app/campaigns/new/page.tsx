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
import factory from "../../../../ethereum/factory";
import web3 from "../../../../ethereum/web3";

function CreateCampaign() {
  const onSubmit = async (values: any) => {
    let accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(
        values.name,
        values.description,
        values.img,
        values.minimumContribution
      )
      .send({
        from: accounts[0],
        // gas: "1000000" no need to specify gas, it will be automatically calculated bu metamask
      });
  };

  const {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: {
      name: "",
      description: "",
      img: "",
      minimumContribution: "",
    },
    onSubmit,
    redirect: "/",
  });

  const { name, description, img, minimumContribution } = values;
  const { nameError, descriptionError, imgError, minimumContributionError } =
    errors;

  return (
    <Card className="container px-4 sm:px-0 mx-auto dark:bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-center">Create Campaign</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="campaign-name" className="font-semibold">
                Campaign Name
              </Label>
              <Input
                id="campaign-name"
                className="dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="campaign-description" className="font-semibold">
                Campaign Description
              </Label>
              <Textarea
                id="campaign-description"
                className="dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                name="description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="campaign-img" className="font-semibold">
                Campaign Image URL
              </Label>
              <Input
                id="campaign-img"
                className="dark:bg-zinc-800 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                name="img"
                value={img}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="minimum-contribution" className="font-semibold">
                Minimum Contribution
              </Label>
              <div className="flex">
                <Input
                  id="minimum-contribution"
                  className="outline-none dark:bg-zinc-800 rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-zinc-500 focus-visible:border-2"
                  name="minimumContribution"
                  value={minimumContribution}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  disabled
                  className="disabled:opacity-100 rounded-l-none"
                >
                  wei
                </Button>
              </div>
            </div>
          </div>
          {isSubmitting ? (
            <Button disabled className="my-4">
              Creating campaign in progress <Loader2 className="animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="my-4">
              Create Campaign
            </Button>
          )}
        </form>
      </CardContent>
      <CardFooter>
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Somthing went wrong while creating campaign
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}

export default CreateCampaign;

// loomos AI Glasses: All - day 16MP Capture & Memory with GPT - 4o
// We are loomos - a team of innovators from SHARGE, known for crafting cutting - edge charging and storage solutions with sleek designs.And now we're taking things further as we believe that wearable AI will soon be essential to everyday life.
// Loomos AI Glasses aren't here to just blend in - they are to redefine everyday wearables with seamless AI.Capture the best moments with 4K photos and 1080P videos, lose yourself in rich open - ear Hi - Fi audio, and stay effortlessly connected with instant & voice - activated assistance powered by ChatGPT - 4o.All packed in a lightweight and everyday design.Like they are always meant to be there.
// https://i.kickstarter.com/assets/047/995/901/45f676ca754b8534ac579fa7d3af54e1_original.png?anim=false&fit=cover&gravity=auto&height=576&origin=ugc&q=92&v=1738162634&width=1024&sig=AP8U744cuvY0UGXLOUA%2BEeOYdM3RAtCbdcy5QkZC8gI%3D
