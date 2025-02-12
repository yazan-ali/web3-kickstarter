import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCampaign } from '@ethereum/campaign';
import { useParams } from 'next/navigation'
import web3 from '@ethereum/web3';

interface RequestFinalizeBtnProps {
    handleFinalizeRequest: () => void;
    isComplete: boolean;
    isLoading: boolean;
}

function RequestFinalizeBtn({ handleFinalizeRequest, isComplete, isLoading }: RequestFinalizeBtnProps) {

    const params = useParams();
    const { address } = params;

    return (
        <>
            {
                isComplete ? (
                    <Button type="button" variant="secondary" className="disabled:opacity-100" disabled>
                        Completed
                    </Button>
                ) : (
                    isLoading ? (
                        <Button disabled className="my-4">
                            Loading <Loader2 className="animate-spin" />
                        </Button>
                    ) : (
                        <Button onClick={handleFinalizeRequest} type="button" variant="secondary">
                            Finalize
                        </Button>
                    )
                )
            }
        </>
    )
}

export default RequestFinalizeBtn