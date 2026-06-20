import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – September 2021",
  description: "The Pakistan Polio Update for September 2021 captures a period of cautious optimism in the country's eradication journey. Following the severe disruptions...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-September-2021.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for September 2021 captures a period of cautious optimism in the country's eradication journey. Following the severe disruptions caused by the COVID-19 pandemic in 2020, which forced the suspension of mass vaccination campaigns and contributed to a rise in cases, Pakistan's programme was rebuilding momentum.</p>
<p>This monthly briefer documents the case count for September 2021, a year in which Pakistan recorded only one wild poliovirus case — a remarkable achievement compared to the 84 cases recorded in 2020. The document details the environmental surveillance findings, which remained a concern even as clinical cases declined, indicating silent circulation of the virus.</p>
<p>The briefer highlights the resumption of immunization campaigns with COVID-19 safety protocols, including use of personal protective equipment by vaccination teams. Community trust rebuilding efforts are also featured, as the pandemic had disrupted routine health interactions.</p>
<p>Coverage data from recent campaigns, surveillance network performance indicators, and maps of positive environmental samples are included. The document also notes the critical importance of sustaining gains made during this low-case period by reaching every child in high-risk areas.</p>
<p>The September 2021 update reflects an important moment where the programme was proving it could adapt and recover, setting the foundation for what it hoped would be the final push toward polio-free status.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – September 2021"
      path="/images/polio-briefer/pakistan-polio-update-september-2021-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2021" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
