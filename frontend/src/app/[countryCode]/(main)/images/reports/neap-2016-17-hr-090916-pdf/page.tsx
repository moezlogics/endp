import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) for Polio Eradication, 2016-2017",
  description: "The National Emergency Action Plan (NEAP) for Polio Eradication (2016-2017) outlines Pakistan’s strategic roadmap for eliminating wild poliovirus (WPV) and...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP-2016-17-HR-090916.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan (NEAP) for Polio Eradication (2016-2017) outlines Pakistan’s strategic roadmap for eliminating wild poliovirus (WPV) and achieving polio-free status. Developed by the National Emergency Operations Centre (NEOC), the plan integrates comprehensive strategies to ensure every child is vaccinated and protected from the virus.</p>

<h2>Strategic Pillars of the NEAP (2016-2017)</h2>
<p>Reaching Every Missed Child: Aims to vaccinate 25.6 million children in high-risk districts through targeted outreach, ensuring consistent immunization coverage across all communities.</p>
<p>Strengthening Routine Immunization: Focuses on integrating polio vaccination into routine health services to build sustainable immunity and reduce reliance on supplementary campaigns.</p>
<p>Environmental Surveillance: Utilizes sewage sampling in 38 cities to detect poliovirus circulation early, enabling rapid response to potential outbreaks.</p>
<p>Quality Assurance: Emphasizes rigorous quality standards for vaccination campaigns, including trained vaccinators, precise coverage monitoring, and prompt verification of vaccination records.</p>
<p>Innovative Delivery Models: Explores alternative vaccination approaches, such as fixed-site and mobile vaccination, to overcome logistical barriers and improve access to remote areas.</p>

<h2>Key Objectives</h2>
<p>Achieve zero wild poliovirus cases nationwide.</p>
<p>Ensure polio-free status for Pakistan by 2018.</p>
<p>Integrate polio eradication with other public health initiatives, such as maternal and child health services.</p>
<p>The NEAP (2016-2017) underscores the importance of sustained commitment, effective coordination among government agencies, international partners, and communities to realize the goal of a polio-free Pakistan.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) for Polio Eradication, 2016-2017"
      path="/images/reports/neap-2016-17-hr-090916-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2016" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
