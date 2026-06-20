import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) for Polio Eradication 2020",
  description: "Foreword On behalf of His Excellency Dr. Sania Nishtar, Special Assistant to the Prime Minister on Poverty Alleviation and Social Protection and Chairperso...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP-2020.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<h2>Foreword</h2>
<p>On behalf of His Excellency Dr. Sania Nishtar, Special Assistant to the Prime Minister on Poverty Alleviation and Social Protection and Chairperson of the Benazir Income Support Program, it gives me immense pleasure to present the National Emergency Action Plan for Polio Eradication 2020 to our valued stakeholders. This plan is a testament to Pakistan’s unwavering resolve to make the country polio-free, reflecting the collective will of the Government of Pakistan and our international partners.</p>
<p>Polio has been one of the most devastating challenges Pakistan has faced, leaving thousands of children paralyzed. However, through sustained efforts and strategic interventions, Pakistan has made significant progress in polio eradication. In 2019, we witnessed a dramatic decline in polio cases, with numbers dropping from 147 to 20. This remarkable achievement demonstrates the effectiveness of our strategies and the commitment of our frontline workers.</p>
<p>The National Emergency Action Plan for Polio Eradication 2020 builds on this momentum. It outlines an ambitious yet achievable roadmap to eliminate wild poliovirus from Pakistan by the year 2022. The plan focuses on high-risk districts, strengthens vaccination campaigns, improves surveillance systems, and engages communities to ensure that every child receives the life-saving polio vaccine.</p>
<p>Collaboration and partnership are the cornerstones of polio eradication. This plan would not be possible without the invaluable contributions of our partners, including the World Health Organization (WHO), UNICEF, the United States Agency for International Development (USAID), the Bill & Melinda Gates Foundation, Rotary International, and the UK’s Foreign, Commonwealth & Development Office (FCDO). Their technical expertise, financial support, and commitment to our shared goal are essential to our success.</p>
<p>As we embark on this critical year, let us renew our commitment to this noble cause. The elimination of polio is not just a public health priority; it is a moral imperative. Together, we can ensure that no Pakistani child ever suffers from the devastating effects of polio again. The year 2020 presents a historic opportunity to achieve this goal, and with your continued support and dedication, we will make Pakistan polio-free.</p>
<p>Thank you for being a vital part of this journey.</p>
<p>Dr. Sania Nishtar Special Assistant to the Prime Minister Chairperson, Benazir Income Support Program</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) for Polio Eradication 2020"
      path="/images/reports/neap-2020-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2020" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
