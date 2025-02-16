import factory from "@ethereum/factory";
import CampaignCarousel from "./CampaignCarousel";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

async function CampaignCarouselSection() {
  noStore();
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return <CampaignCarousel campaigns={campaigns.slice(0, 5)} />;
}

export default CampaignCarouselSection;
