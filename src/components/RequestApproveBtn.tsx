import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import web3 from "@ethereum/web3";
import { getCampaign } from "@ethereum/campaign";

interface RequestApproveBtnProps {
  handleRequestApprove: () => void;
  address: any;
  isCompleted: boolean;
  isLoading: boolean;
}

function RequestApproveBtn({
  handleRequestApprove,
  address,
  isCompleted,
  isLoading,
}: RequestApproveBtnProps) {
  const [canApprove, setCanApprove] = useState(false);

  useEffect(() => {
    const isApprover = async () => {
      let campaign = getCampaign(address);
      let accounts = await web3.eth.getAccounts();
      let canApprove = await campaign.methods.approvers(accounts[0]).call();
      setCanApprove(canApprove);
    };
    isApprover();
  }, []);

  return (
    <>
      {isLoading ? (
        <Button disabled className="my-4">
          Loading <Loader2 className="animate-spin" />
        </Button>
      ) : (
        <Button
          onClick={handleRequestApprove}
          type="button"
          className="bg-green-700"
          disabled={!canApprove || isCompleted}
        >
          Approve
        </Button>
      )}
    </>
  );
}

export default RequestApproveBtn;
