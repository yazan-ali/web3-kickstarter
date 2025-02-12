import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import RequestRow from "@/components/RequestRow";

interface RequestsProps {
    requests: any[];
    approversCount: number;
    page: number;
    ITEMS_PER_PAGE: number;
}

function Requests({ requests, approversCount, page, ITEMS_PER_PAGE }: RequestsProps) {
    return (
        <div className="rounded-lg border mt-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Ether Amount</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Approval Count</TableHead>
                        <TableHead>Approve</TableHead>
                        <TableHead>Finalize</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.map((request: any, idx: number) => (
                        <RequestRow
                            key={idx}
                            request={request}
                            requestNumber={(page - 1) * ITEMS_PER_PAGE + idx + 1}
                            approversCount={approversCount}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total Requests</TableCell>
                        <TableCell className="text-right">{requests.length}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}

export default Requests