import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) 2018–2019",
  description: "The National Emergency Action Plan for 2018–2019 represents Pakistan's strategic framework during a period that bridged apparent success and subsequent set...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP-2018-2019.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan for 2018–2019 represents Pakistan's strategic framework during a period that bridged apparent success and subsequent setback. Following the low case counts of 2017 and 2018, the NEAP for this period aimed to capitalize on momentum and move definitively toward interrupting poliovirus transmission.</p>
<p>The 2018–2019 NEAP introduced an intensive focus on five priority districts identified as the most critical remaining transmission hotspots. Resources and supervisory attention were concentrated on these areas while maintaining baseline operations across the broader high-risk geography.</p>
<p>Key innovations in the 2018–2019 NEAP included expanded use of geographic information systems for microplanning, a new accountability framework tying district officers' performance to measurable coverage outcomes, and an enhanced focus on reaching mobile and nomadic populations along major transit routes.</p>
<p>The plan also emphasized the importance of community engagement beyond campaign periods, recognizing that building lasting vaccine acceptance requires year-round relationship building rather than intensified outreach only during campaign windows.</p>
<p>In retrospect, the 2018–2019 NEAP did not fully prevent the 2019 resurgence, raising important questions about what the plan missed or failed to address with sufficient urgency. The document is therefore an important case study in both what well-designed eradication strategy looks like and the challenges of translating strategy into consistent operational results.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) 2018–2019"
      path="/images/reports/neap-2018-2019-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2018" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
