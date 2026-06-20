import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "High Level Polio Delegation Concludes Visit to Pakistan",
  description: "A high-level delegation from the Global Polio Eradication Initiative concluded a significant visit to Pakistan, reviewing programme performance, meeting wi...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2161-high-level-polio-delegation-concludes-visit-to-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>A high-level delegation from the Global Polio Eradication Initiative concluded a significant visit to Pakistan, reviewing programme performance, meeting with senior government officials, and visiting field operations. The delegation included representatives from WHO, UNICEF, the Bill & Melinda Gates Foundation, Rotary International, and the US Centers for Disease Control and Prevention.</p>
<p>During the visit, the delegation held detailed discussions with Pakistan's National Emergency Operations Centre, provincial authorities, and district health officials. They reviewed case data, campaign coverage statistics, environmental surveillance findings, and community engagement strategies.</p>
<p>Field visits to vaccination campaigns and health facilities allowed delegation members to observe operations firsthand and speak directly with frontline workers and community members. These visits informed their assessment of both programme strengths and areas requiring urgent improvement.</p>
<p>The delegation acknowledged Pakistan's commitment and progress while identifying critical gaps that must be addressed to achieve eradication. Key concerns included persistent vaccine hesitancy in specific communities, ongoing security challenges, and the need for stronger accountability at the district and union council levels.</p>
<p>Upon concluding their visit, delegation members expressed their continued support for Pakistan's programme and pledged to maintain technical and financial assistance. They called on all stakeholders — government, civil society, religious leaders, and communities — to unite in the final push to end poliovirus transmission in Pakistan permanently.</p>`

  return (
    <PolioInfoPage
      title="High Level Polio Delegation Concludes Visit to Pakistan"
      path="/media-room/media-releases/2161-high-level-polio-delegation-concludes-visit-to-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Delegation Type", value: "GPEI Global Board" },
        { label: "Review Focus", value: "NEOC Operations" },
        { label: "Key Finding", value: "Excellent Dedication" },
        { label: "Global Status", value: "Urgent Priority" }
      ]}
    />
  )
}
