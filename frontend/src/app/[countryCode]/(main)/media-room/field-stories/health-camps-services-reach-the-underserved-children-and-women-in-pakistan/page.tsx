import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Health Camps Services Reach the Underserved Children and Women in Pakistan",
  description: "This field story documents the impact of health camp initiatives organized in coordination with the polio eradication programme to deliver comprehensive he...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/health-camps-services-reach-the-underserved-children-and-women-in-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story documents the impact of health camp initiatives organized in coordination with the polio eradication programme to deliver comprehensive health services to underserved communities. By combining polio vaccination with a range of other health services in a single camp event, the programme reaches families who rarely have access to formal healthcare.</p>
<p>In these health camps, children receive polio drops alongside other vaccines, vitamin A supplements, deworming tablets, and basic health screenings. Women receive maternal health consultations, antenatal care information, and reproductive health support. The comprehensive service package attracts higher attendance than single-focus vaccination activities.</p>
<p>The camps are particularly valuable in remote areas, urban slums, refugee settlements, and communities where health facilities are non-existent or inaccessible. By bringing services directly to communities, health camps eliminate the most common barrier to health access: distance.</p>
<p>Participating communities often experience these camps as a positive government presence — one that gives rather than asks. This perception helps rebuild trust and creates goodwill that translates into greater openness to vaccination during subsequent campaign rounds.</p>
<p>The integration of polio vaccination into broader health services reflects an evidence-based understanding that disease eradication cannot be fully achieved in isolation from the overall health system. Communities that feel genuinely cared for by health authorities are far more likely to engage willingly with vaccination activities.</p>`

  return (
    <PolioInfoPage
      title="Health Camps Services Reach the Underserved Children and Women in Pakistan"
      path="/media-room/field-stories/health-camps-services-reach-the-underserved-children-and-women-in-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus Area", value: "Community Reach" },
        { label: "Role", value: "Frontline Mobilizer" },
        { label: "Status", value: "Field Report" }
      ]}
    />
  )
}
