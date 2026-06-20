import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "EOC Comms Update January 5 2017",
  description: "This document presents a communication update from the Emergency Operations Centre (EOC) dated January 5, 2017. It likely outlines key activities, progress...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/communication_update/EOC-Comms-update-January-5-2017.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This document presents a communication update from the Emergency Operations Centre (EOC) dated January 5, 2017. It likely outlines key activities, progress, and priorities related to polio eradication efforts in Pakistan for the specified period.</p>

<h2>Key Information</h2>
<p>Communication Update: The document serves as a communication tool to disseminate important information about polio eradication initiatives.</p>
<p>Timeline Context: The January 5, 2017 date places the update within a specific timeframe of the polio eradication campaign, allowing stakeholders to understand the situation at that point.</p>
<p>EOC Activities: It likely details activities undertaken by the Emergency Operations Centre, which is the central body for coordinating polio eradication efforts in Pakistan.</p>
<p>Key Stakeholders: The update probably includes information relevant to government agencies, international partners, healthcare workers, and the public involved in polio eradication.</p>
<p>This document is essential for stakeholders seeking to understand the status of polio eradication efforts in Pakistan during early 2017 and the specific initiatives being implemented by the EOC.</p>`

  return (
    <PolioInfoPage
      title="EOC Comms Update January 5 2017"
      path="/images/communication_update/eoc-comms-update-january-5-2017-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2017" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
