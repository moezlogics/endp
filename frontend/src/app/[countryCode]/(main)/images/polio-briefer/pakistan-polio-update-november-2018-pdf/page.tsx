import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – November 2018",
  description: "The Pakistan Polio Update for November 2018 captures the programme during one of its strongest recent periods. With a total of only 12 cases confirmed in 2...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-NOVEMBER-2018.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for November 2018 captures the programme during one of its strongest recent periods. With a total of only 12 cases confirmed in 2018 by November — matching the low numbers of 2017 — the briefer reflects both the achievements of the year and the preparations being made for a final nationwide campaign before year's end.</p>
<p>November 2018 falls after the peak transmission season and before the traditional year-end review period. Programme managers were analyzing the year's data to understand where cases had occurred, what transmission patterns had been observed, and what lessons should inform the planning for 2019.</p>
<p>Environmental surveillance data for November 2018 continued to show poliovirus presence in sewage samples in KP and Balochistan, providing the warning signal that the programme had not yet achieved the silent transmission interruption needed for true eradication progress.</p>
<p>The briefer highlights community mobilization activities conducted during the month, including World Polio Day follow-up events, engagement with religious leaders ahead of year-end campaigns, and district-level review meetings assessing campaign quality.</p>
<p>In retrospect, the November 2018 briefer captures Pakistan at a moment when the programme appeared to be succeeding but where the foundations of success were not yet fully consolidated. The document is studied for what it reveals about the program's performance and the early signals that may have forewarned the 2019 resurgence.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – November 2018"
      path="/images/polio-briefer/pakistan-polio-update-november-2018-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2018" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
