import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Reports | Knowledge Centre | End Polio Pakistan",
  description: "The Knowledge Centre Reports page on End Polio Pakistan provides a centralized repository of official documents related to Pakistan's polio eradication eff...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/knowledge-centre/reports",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Knowledge Centre Reports page on End Polio Pakistan provides a centralized repository of official documents related to Pakistan's polio eradication effort. This section is an invaluable resource for researchers, health professionals, policymakers, journalists, and development workers seeking authoritative data and strategic documents.</p>
<p>Available reports include National Emergency Action Plans (NEAPs) from multiple years, monthly Pakistan Polio Updates, environmental surveillance summaries, Independent Monitoring Board assessments, and technical guidance documents. Together, these materials tell the comprehensive story of Pakistan's two-decade journey toward eradication.</p>
<p>Each NEAP document outlines the operational strategy for a given year, detailing planned campaign rounds, surveillance targets, community mobilization activities, and accountability measures. Monthly updates provide granular data on cases, environmental findings, and campaign performance.</p>
<p>The reports section also includes specialized documents on topics such as the role of female health workers, cross-border coordination, the impact of COVID-19 on immunization activities, and the use of technology to improve campaign performance.</p>
<p>All documents are available for free download, reflecting the programme's commitment to transparency and knowledge sharing. The information supports evidence-based decision-making at every level of the programme hierarchy, from national coordinators to district health officers.</p>
<p>For anyone seeking to understand Pakistan's polio eradication strategy in depth, the Knowledge Centre Reports page is the essential starting point.</p>`

  return (
    <PolioInfoPage
      title="Reports | Knowledge Centre | End Polio Pakistan"
      path="/knowledge-centre/reports"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Reports | Knowledge ..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
