import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCampaign } from '@ethereum/campaign';
import web3 from '@ethereum/web3';

interface RequestFinalizeBtnProps {
    handleFinalizeRequest: () => void;
    address: any;
    isCompleted: boolean;
    isLoading: boolean;
    canFinalize: boolean;
}

function RequestFinalizeBtn({ handleFinalizeRequest, address, isCompleted, isLoading, canFinalize }: RequestFinalizeBtnProps) {

    const [isManager, setIsManager] = useState(false);

    useEffect(() => {
        const getCampaignManager = async () => {
            let campaign = getCampaign(address);
            let accounts = await web3.eth.getAccounts();
            let manager = await campaign.methods.manager(accounts[0]).call();
            setIsManager(accounts[0] === manager);
        }

        getCampaignManager();
    }, []);

    return (
        <>
            {
                isCompleted ? (
                    <Button type="button" variant="secondary" className="disabled:opacity-100" disabled>
                        Completed
                    </Button>
                ) : (
                    isLoading ? (
                        <Button disabled className="my-4">
                            Loading <Loader2 className="animate-spin" />
                        </Button>
                    ) : (
                        <Button onClick={handleFinalizeRequest} type="button" variant="secondary" disabled={!(canFinalize && isManager)}>
                            Finalize
                        </Button>
                    )
                )
            }
        </>
    )
}

export default RequestFinalizeBtn