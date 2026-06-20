import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "15th Independent Monitoring Board Report – Final",
  description: "The 15th Independent Monitoring Board (IMB) Report is a critical document that evaluates Pakistan's progress in the fight against poliovirus. The IMB is an...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/Stories/15th-IMB-Report-FINAL.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The 15th Independent Monitoring Board (IMB) Report is a critical document that evaluates Pakistan's progress in the fight against poliovirus. The IMB is an independent body that provides honest, evidence-based assessments of the Global Polio Eradication Initiative, with a particular focus on the two remaining endemic countries — Pakistan and Afghanistan.</p>
<p>This final report examines key performance indicators including vaccination coverage rates, the quality of immunization campaigns, environmental surveillance data, and the overall effectiveness of eradication strategies. It highlights both achievements and ongoing gaps, offering candid recommendations to strengthen the programme.</p>
<p>The report draws on field visits, data analysis, and consultations with government officials, health workers, and international partners. It identifies high-risk districts where transmission persists and suggests targeted interventions to reach unvaccinated children.</p>
<p>For health professionals, policymakers, and development partners, this document serves as an essential reference. It reflects the global community's commitment to holding the programme accountable and ensuring that every child in Pakistan receives the protection they deserve. Transparent monitoring through reports like this one is a cornerstone of the eradication effort, helping Pakistan move closer to a polio-free future.</p>`

  return (
    <PolioInfoPage
      title="15th Independent Monitoring Board Report – Final"
      path="/images/stories/15th-imb-report-final-pdf"
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
