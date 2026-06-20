import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Eradication Final Report – Programme Outcomes, Key Data & Strategic Lessons | End Polio Pakistan",
  description: "The Pakistan Polio Programme Final Report is a comprehensive document that evaluates the outcomes, achievements, and lessons learned from a defined phase o...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/polio-final-report.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Programme Final Report is a comprehensive document that evaluates the outcomes, achievements, and lessons learned from a defined phase of the country's eradication effort. Final reports of this nature serve as critical reference documents for programme planners, policymakers, donors, and global health researchers seeking to understand both what worked and what needs improvement.</p>
<p>The report covers key performance indicators across all programme pillars: immunization campaign coverage rates, environmental surveillance network performance, community engagement outcomes, accountability system effectiveness, and case investigation quality. It presents data in a format that allows comparison across years and provinces, revealing geographic and temporal trends in programme performance.</p>
<p>A significant section is dedicated to lessons learned — the honest, evidence-based assessment of programme failures and successes that is essential for adaptive management. This includes analysis of why certain high-risk districts consistently underperformed, what community engagement approaches proved most effective, and how cross-border coordination with Afghanistan was managed.</p>
<p>The report also documents the programme's financial management, showing how donor resources were allocated across different activities and geographies. This transparency is essential for maintaining donor confidence and ensuring that future investments are directed to the highest-impact activities.</p>
<p>For global health practitioners, the Pakistan Polio Final Report offers insights applicable to other large-scale disease eradication programmes, making it a valuable contribution to the broader knowledge base on complex public health programme implementation.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Eradication Final Report – Programme Outcomes, Key Data & Strategic Lessons | End Polio Pakistan"
      path="/images/reports/polio-final-report-pdf"
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
