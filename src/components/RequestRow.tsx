import { useState } from "react";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table";
import web3 from '@ethereum/web3';
import { getCampaign } from '@ethereum/campaign';
import { useParams } from 'next/navigation'
import RequestApproveBtn from "@/components/RequestApproveBtn";
import RequestFinalizeBtn from "@/components/RequestFinalizeBtn";

interface RequestRowProps {
    request: any;
    requestNumber: number;
    approversCount: number;
}
function RequestRow({ request, requestNumber, approversCount }: RequestRowProps) {

    const params = useParams();
    const { address } = params;

    const [approvalCount, setApprovalCount] = useState(Number(request.approvalCount));
    const [isCompleted, setIsCompleted] = useState(request.complete);
    const [isApproveRequestLoading, setIsApproveRequestLoading] = useState(false);
    const [isFinalizeRequestLoading, setIsFinalizeRequestLoading] = useState(false);

    const handleRequestApprove = async () => {
        try {
            setIsApproveRequestLoading(true);
            let accounts = await web3.eth.getAccounts();
            let campaign = getCampaign(address);
            await campaign.methods.approveRequest(requestNumber - 1).send({ from: accounts[0] });
            // await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            setApprovalCount((prev: number) => prev + 1);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsApproveRequestLoading(false);
        };
    }

    const handleFinalizeRequest = async () => {
        try {
            setIsFinalizeRequestLoading(true);
            let accounts = await web3.eth.getAccounts();
            const campaign = getCampaign(address);
            await campaign.methods.finalizeRequest(requestNumber - 1).send({ from: accounts[0] });
            // await new Promise((resolve, reject) => setTimeout(resolve, 3000));
            setIsCompleted(true);
        } catch (error: any) {
            console.error(error);
        } finally {
            setIsFinalizeRequestLoading(false);
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{requestNumber}</TableCell>
            <TableCell>{request.description}</TableCell>
            <TableCell>{web3.utils.fromWei(request.value, "ether")}</TableCell>
            <TableCell>{request.recipient}</TableCell>
            <TableCell>{approvalCount}/{approversCount}</TableCell>
            <TableCell>
                <RequestApproveBtn
                    handleRequestApprove={handleRequestApprove}
                    isLoading={isApproveRequestLoading}
                />
            </TableCell>
            <TableCell>
                <RequestFinalizeBtn
                    handleFinalizeRequest={handleFinalizeRequest}
                    isComplete={isCompleted}
                    isLoading={isFinalizeRequestLoading}
                />
            </TableCell>
        </TableRow>
    )
}

export default RequestRow;