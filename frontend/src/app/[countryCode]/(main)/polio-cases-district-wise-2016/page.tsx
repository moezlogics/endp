import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Cases District-Wise (2016)",
  description: "This document presents a comprehensive breakdown of wild poliovirus (WPV) cases across different districts of Pakistan for the year 2016. The data highligh...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polio-cases-district-wise-2016",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This document presents a comprehensive breakdown of wild poliovirus (WPV) cases across different districts of Pakistan for the year 2016. The data highlights the geographical distribution of polio cases and underscores the ongoing challenges in eradicating the virus.</p>

<h2>Key Information</h2>
<p>District-wise Case Distribution: The table lists specific districts where polio cases were reported, along with the number of confirmed cases in each district.</p>
<p>Geographical Hotspots: Certain districts emerge as hotspots for poliovirus circulation, indicating areas that require intensified vaccination efforts.</p>
<p>National Context: The data provides context for the overall polio situation in Pakistan during 2016, reflecting the progress made and the persistent challenges that remain.</p>
<p>This information is crucial for understanding the epidemiology of polio in Pakistan and for guiding targeted interventions to protect children from paralysis.</p>`

  return (
    <PolioInfoPage
      title="Polio Cases District-Wise (2016)"
      path="/polio-cases-district-wise-2016"
      contentHtml={content}
      metrics={[
        { label: "Programme", value: "Polio Eradication" },
        { label: "Coordinator", value: "NEOC Pakistan" },
        { label: "Coverage", value: "Nationwide" },
        { label: "Helpline", value: "1166" }
      ]}
    />
  )
}
