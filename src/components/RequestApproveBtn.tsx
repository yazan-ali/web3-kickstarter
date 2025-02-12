import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface RequestApproveBtnProps {
    handleRequestApprove: () => void;
    isLoading: boolean;
}

function RequestApproveBtn({ handleRequestApprove, isLoading }: RequestApproveBtnProps) {

    return (
        <>
            {
                isLoading ? (
                    <Button disabled className="my-4">
                        Loading <Loader2 className="animate-spin" />
                    </Button>
                ) : (
                    <Button onClick={handleRequestApprove} type="button" className="bg-green-700">
                        Approve
                    </Button>
                )
            }
        </>
    )
}

export default RequestApproveBtn;