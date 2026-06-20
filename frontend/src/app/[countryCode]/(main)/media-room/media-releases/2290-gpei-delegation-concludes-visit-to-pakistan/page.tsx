import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "GPEI Delegation Concludes Visit to Pakistan",
  description: "A high-level delegation from the Global Polio Eradication Initiative completed a comprehensive multi-day visit to Pakistan, during which they assessed prog...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2290-gpei-delegation-concludes-visit-to-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>A high-level delegation from the Global Polio Eradication Initiative completed a comprehensive multi-day visit to Pakistan, during which they assessed programme performance, met with senior officials, and observed field operations across multiple provinces. The visit was part of GPEI's regular engagement with Pakistan, reflecting the global significance of the country's eradication effort.</p>
<p>The delegation, comprising technical experts, senior programme managers, and representatives of major donor governments, reviewed all key performance dimensions of the programme. These included campaign coverage data, environmental surveillance findings, case investigation quality, community engagement effectiveness, and cross-border coordination with Afghanistan.</p>
<p>Field visits to vaccination campaigns in high-risk districts gave delegation members direct exposure to operational realities, including the logistical challenges, security dynamics, and community relations that vaccination teams navigate daily. These observations enriched their technical assessments with contextual understanding.</p>
<p>In discussions with Pakistan's prime minister, health minister, and NEOC leadership, the delegation conveyed both appreciation for the programme's commitment and frank assessments of areas requiring urgent improvement. They outlined specific technical recommendations for enhancing campaign quality and programme accountability.</p>
<p>The delegation's conclusions were summarized in a statement released at the conclusion of the visit, which called for sustained action in high-risk districts, stronger provincial accountability, and continued international support. The visit reaffirmed the deep partnership between Pakistan and the global polio eradication community.</p>`

  return (
    <PolioInfoPage
      title="GPEI Delegation Concludes Visit to Pakistan"
      path="/media-room/media-releases/2290-gpei-delegation-concludes-visit-to-pakistan"
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
