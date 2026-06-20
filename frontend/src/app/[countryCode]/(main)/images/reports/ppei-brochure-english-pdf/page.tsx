import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Eradication Initiative (PPEI) – Brochure (English)",
  description: "The Pakistan Polio Eradication Initiative (PPEI) Brochure provides a comprehensive overview of the programme's organizational structure, strategic prioriti...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/PPEI%20Brochure%20English.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Eradication Initiative (PPEI) Brochure provides a comprehensive overview of the programme's organizational structure, strategic priorities, implementation mechanisms, and funding sources. It serves as an accessible introduction to Pakistan's eradication effort for new partners, donors, government officials, and members of the public seeking to understand how the programme works.</p>
<p>The brochure describes the PPEI's multi-tiered governance structure, from the national level down to district and union council operations. It explains the roles of the federal government, provincial governments, the National Emergency Operations Centre, and international partners in planning and executing the eradication strategy.</p>
<p>Key programme pillars described in the brochure include immunization activities, surveillance systems, communication and social mobilization, and accountability mechanisms. Each pillar is explained in terms of its function, reach, and contribution to the overall eradication goal.</p>
<p>The brochure also provides context on the scale of the effort: hundreds of thousands of vaccination workers trained and deployed, millions of children vaccinated in each campaign round, thousands of environmental surveillance sites monitored annually, and billions of Pakistani rupees invested in the effort each year.</p>
<p>For organizations considering supporting Pakistan's polio programme, this brochure serves as a credible, concise entry point into understanding where support is needed and how it is used. It reflects the programme's commitment to transparency and its eagerness to welcome new partners in the final push toward eradication.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Eradication Initiative (PPEI) – Brochure (English)"
      path="/images/reports/ppei-brochure-english-pdf"
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
