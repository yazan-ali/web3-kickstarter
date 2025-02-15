"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCampaign } from "@ethereum/campaign";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useParams } from "next/navigation";
import Requests from "@/components/Requests";

const ITEMS_PER_PAGE = 10;
const RETRY_DELAY = 1000;

async function fetchWithRetry(
  fn: () => Promise<any>,
  retries = 3
): Promise<any> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0 && error.message.includes("Too Many Requests")) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(fn, retries - 1);
    }
    throw error;
  }
}

function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [approversCount, setApproversCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const params = useParams();
  const { address } = params;

  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true);
        setError(null);
        const campaign = getCampaign(address);

        const requestsCount = await fetchWithRetry(() =>
          campaign.methods.getRequestsCount().call()
        );
        setRequestCount(Number(requestsCount));

        const approversCount = await fetchWithRetry(() =>
          campaign.methods.approversCount().call()
        );
        setApproversCount(Number(approversCount));

        const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = Math.min(
          startIndex + ITEMS_PER_PAGE,
          Number(requestsCount)
        );

        const requests = await Promise.all(
          Array(endIndex - startIndex)
            .fill("")
            .map((_, index) =>
              fetchWithRetry(() =>
                campaign.methods.requests(startIndex + index).call()
              )
            )
        );
        setRequests(requests);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, [address, page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container px-4 sm:px-0 mx-auto">
      <div className="flex justify-end">
        <Link href={`/campaigns/${address}/requests/new`}>
          <Button>
            <CirclePlus /> Create Request
          </Button>
        </Link>
      </div>
      <Requests
        requests={requests}
        approversCount={approversCount}
        page={page}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      />
      {requestCount > ITEMS_PER_PAGE && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * ITEMS_PER_PAGE >= requestCount}
          >
            Next
          </Button>
        </div>
      )}
      <Toaster />
    </div>
  );
}

export default RequestsPage;
