import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan 2013 (NEAP 2013)",
  description: "National Emergency Action Plan 2013 (NEAP 2013) — this official report published by the National Emergency Operations Centre (NEOC) provides a detailed ass...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/National-Emergency-Action-Plan-2013-(NEAP-2013).pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>National Emergency Action Plan 2013 (NEAP 2013)</strong> — this official report published by the National Emergency Operations Centre (NEOC) provides a detailed assessment of the strategy, budget, and field implementation of the Pakistan Polio Eradication Programme. Used as a reference by stakeholders and global partners, the document compiles operational data to assess progress and address gaps in immunization.</p>

<h2>Strategic Analysis &amp; Operational Gaps</h2>
<p>The report examines campaign coverage statistics, environmental surveillance logs, and routine immunization indicators across all provinces. Through rigorous quality audits, including post-campaign lot quality assurance sampling (LQAS), the program maps union councils that require additional resources or improved community engagement.</p>
<p>A key focus of this report is improving access in security-compromised areas, tracking children on the move, and refining microplans. The report highlights the role of cross-border coordination and the integration of polio services with clean water, hygiene, and primary healthcare initiatives.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan 2013 (NEAP 2013)"
      path="/images/reports/national-emergency-action-plan-2013-neap-2013-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2013" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
