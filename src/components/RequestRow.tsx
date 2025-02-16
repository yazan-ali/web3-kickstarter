import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import web3 from "@ethereum/web3";
import { getCampaign } from "@ethereum/campaign";
import { useParams } from "next/navigation";
import RequestApproveBtn from "@/components/RequestApproveBtn";
import RequestFinalizeBtn from "@/components/RequestFinalizeBtn";

interface RequestRowProps {
  request: any;
  requestNumber: number;
  approversCount: number;
}
function RequestRow({
  request,
  requestNumber,
  approversCount,
}: RequestRowProps) {
  const params = useParams();
  const { address } = params;

  const { toast } = useToast();

  const [approvalCount, setApprovalCount] = useState(
    Number(request.approvalCount)
  );
  const [isCompleted, setIsCompleted] = useState(request.complete);
  const [isApproveRequestLoading, setIsApproveRequestLoading] = useState(false);
  const [isFinalizeRequestLoading, setIsFinalizeRequestLoading] =
    useState(false);

  const handleRequestApprove = async () => {
    try {
      setIsApproveRequestLoading(true);
      let accounts = await web3.eth.getAccounts();
      let campaign = getCampaign(address as string);
      await campaign.methods
        .approveRequest(requestNumber - 1)
        .send({ from: accounts[0] });
      setApprovalCount((prev: number) => prev + 1);
      toast({
        title: "Request Approved",
        description: "You have successfully approved the request",
      });
    } catch (error: any) {
      toast({
        title: "Approval Failed",
        description: "Failed to approve the request",
        variant: "destructive",
      });
    } finally {
      setIsApproveRequestLoading(false);
    }
  };

  const handleFinalizeRequest = async () => {
    try {
      setIsFinalizeRequestLoading(true);
      let accounts = await web3.eth.getAccounts();
      const campaign = getCampaign(address as string);
      await campaign.methods
        .finalizeRequest(requestNumber - 1)
        .send({ from: accounts[0] });
      setIsCompleted(true);
      toast({
        title: "Request Finalized",
        description: "You have successfully finalized the request",
      });
    } catch (error: any) {
      toast({
        title: "Finalization Failed",
        description: "Failed to finalize the request",
        variant: "destructive",
      });
    } finally {
      setIsFinalizeRequestLoading(false);
    }
  };

  return (
    <TableRow className={`${isCompleted ? "opacity-50" : ""}`}>
      <TableCell className="font-medium">{requestNumber}</TableCell>
      <TableCell>{request.description}</TableCell>
      <TableCell>{web3.utils.fromWei(request.value, "ether")}</TableCell>
      <TableCell>{request.recipient}</TableCell>
      <TableCell>
        {approvalCount}/{approversCount}
      </TableCell>
      <TableCell>
        <RequestApproveBtn
          handleRequestApprove={handleRequestApprove}
          address={address}
          isCompleted={isCompleted}
          isLoading={isApproveRequestLoading}
        />
      </TableCell>
      <TableCell>
        <RequestFinalizeBtn
          handleFinalizeRequest={handleFinalizeRequest}
          address={address}
          isCompleted={isCompleted}
          isLoading={isFinalizeRequestLoading}
          canFinalize={request.approvalCount > approversCount / 2}
        />
      </TableCell>
    </TableRow>
  );
}

export default RequestRow;
