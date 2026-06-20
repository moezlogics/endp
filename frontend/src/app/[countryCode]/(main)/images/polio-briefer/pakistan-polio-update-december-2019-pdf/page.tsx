import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – December 2019",
  description: "The Pakistan Polio Update for December 2019 closes out one of the most devastating years in Pakistan's recent eradication history. By December 2019, Pakist...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-December-2019.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for December 2019 closes out one of the most devastating years in Pakistan's recent eradication history. By December 2019, Pakistan had recorded 147 confirmed wild poliovirus cases — the highest annual total in several years and a shocking reversal from the low case counts of 2017 and 2018.</p>
<p>The December briefer provides a year-end accounting of the 2019 situation: the geographic distribution of 147 cases across provinces and districts, the environmental surveillance picture showing widespread viral circulation, an analysis of transmission chains, and an honest assessment of what went wrong.</p>
<p>The resurgence in 2019 was attributed to multiple factors: the cumulative effect of years of inadequate campaign quality in certain districts, security-related vaccination gaps in tribal areas, the continued challenge of cross-border transmission from Afghanistan, and a failure to maintain the operational intensity that had produced the 2017 low.</p>
<p>The December 2019 briefer describes the emergency response measures activated in the final months of the year and the plans being developed for a more intensive and accountable programme in 2020. Despite the difficult circumstances, it ends with a commitment to learning from 2019 and rebuilding the momentum needed for eradication.</p>
<p>This document is essential reading for understanding the most significant setback in Pakistan's recent eradication history and the lessons that were drawn from it for subsequent programme planning.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – December 2019"
      path="/images/polio-briefer/pakistan-polio-update-december-2019-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2019" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
