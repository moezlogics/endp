import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – August 2020",
  description: "The Pakistan Polio Update for August 2020 provides a snapshot of the eradication programme during a particularly challenging month in a difficult year. Wit...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/poliobriefer/Pakistan-Polio-Update-August-2020.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for August 2020 provides a snapshot of the eradication programme during a particularly challenging month in a difficult year. With mass vaccination campaigns having been suspended in March 2020 due to the COVID-19 pandemic, the August briefer documents the serious consequences of several months without large-scale immunization activities.</p>
<p>August 2020 saw Pakistan grappling with rising polio case counts as the immunity gaps created by suspended campaigns began to manifest in clinical paralysis cases. The briefer captures the geographic spread of cases and the environmental surveillance picture, which showed poliovirus present in sewage samples across an alarmingly wide area.</p>
<p>The document also reports on early attempts to resume limited sub-national vaccination activities in the highest-risk areas as COVID-19 restrictions gradually eased. These initial campaigns were conducted with adapted protocols including PPE for vaccination teams and modified household engagement approaches.</p>
<p>The August 2020 briefer includes important epidemiological analysis comparing the 2020 situation with previous years and projecting the likely impact of continued campaign delays. This analysis informed emergency planning for the remainder of 2020.</p>
<p>For programme managers and researchers, this document illustrates the cascading health consequences of disrupting routine and campaign immunization activities, even temporarily, and reinforces the argument that vaccination must be treated as an essential service that continues even during broader public health emergencies.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – August 2020"
      path="/images/poliobriefer/pakistan-polio-update-august-2020-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2020" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
