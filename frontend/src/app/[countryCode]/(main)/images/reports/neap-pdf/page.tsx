import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) – Latest",
  description: "The National Emergency Action Plan (NEAP) represents the most current comprehensive strategic framework guiding Pakistan's polio eradication programme. Upd...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan (NEAP) represents the most current comprehensive strategic framework guiding Pakistan's polio eradication programme. Updated annually by the National Emergency Operations Centre in collaboration with provincial governments and international partners, the NEAP provides the detailed operational blueprint for achieving poliovirus interruption.</p>
<p>The document identifies priority geographic areas based on the latest epidemiological analysis, environmental surveillance data, and vaccination coverage assessments. It sets annual targets for campaign coverage, surveillance indicators, and community engagement milestones. Each province and high-risk district has specific targets and accountability mechanisms outlined in the plan.</p>
<p>Key strategies typically covered in the NEAP include the number and scheduling of immunization campaign rounds, environmental sampling site expansion, microplanning improvements, accountability and supervision systems, cross-border coordination with Afghanistan, and social mobilization activities.</p>
<p>The NEAP also outlines resource requirements, including vaccine supplies, human resources, operational budgets, and security arrangements. This allows donor partners to align their contributions with identified needs and ensures efficient use of available resources.</p>
<p>Regular updates to the NEAP reflect the programme's adaptive management approach — learning from performance data and adjusting strategy to address emerging challenges. For anyone working in or studying Pakistan's polio eradication effort, the NEAP is the single most important strategic document and an essential reference for understanding the programme's priorities and direction.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) – Latest"
      path="/images/reports/neap-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "Multi-Year" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
