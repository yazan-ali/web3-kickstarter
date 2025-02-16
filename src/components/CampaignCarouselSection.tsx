import factory from "@ethereum/factory";
import CampaignCarousel from "./CampaignCarousel";

export const dynamic = "force-dynamic";

async function CampaignCarouselSection() {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return <CampaignCarousel campaigns={campaigns.slice(0, 5)} />;
}

export default CampaignCarouselSection;
