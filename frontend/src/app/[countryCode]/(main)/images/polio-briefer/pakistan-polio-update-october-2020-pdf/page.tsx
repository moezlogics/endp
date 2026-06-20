import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – October 2020",
  description: "The Pakistan Polio Update for October 2020 captures the state of the eradication programme in the midst of the extraordinary challenges posed by the COVID-...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-October-2020.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for October 2020 captures the state of the eradication programme in the midst of the extraordinary challenges posed by the COVID-19 pandemic. After mass vaccination campaigns were suspended earlier in 2020 due to pandemic-related restrictions, the programme was gradually rebuilding operations, and October 2020 represented an important period of recovery and adaptation.</p>
<p>By October 2020, Pakistan had recorded 84 wild polio cases for the year — a significant increase from previous years that was directly linked to the suspension of vaccination campaigns during the COVID-19 lockdowns. Environmental surveillance also showed widespread poliovirus circulation in sewage samples across multiple provinces.</p>
<p>The October briefer documents the resumption of vaccination activities with enhanced safety protocols, including use of masks and gloves by vaccination teams, physical distancing guidelines, and modified community engagement approaches to respect pandemic-era social norms.</p>
<p>Campaign performance data for resumed activities showed some improvement in coverage, but reaching pre-pandemic levels required sustained effort. The briefer identifies high-risk districts where immunity gaps were most severe and where emergency targeted campaigns were being prioritized.</p>
<p>The October 2020 update is a critical historical document that illustrates how the COVID-19 pandemic intersected with and exacerbated Pakistan's pre-existing polio challenge, creating a difficult dual burden that required innovative programmatic responses.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – October 2020"
      path="/images/polio-briefer/pakistan-polio-update-october-2020-pdf"
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
