import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – December 2018",
  description: "The Pakistan Polio Update for December 2018 closes out a year in which Pakistan recorded 12 wild poliovirus cases — the second consecutive year of very low...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-December-2018.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for December 2018 closes out a year in which Pakistan recorded 12 wild poliovirus cases — the second consecutive year of very low case numbers. The December briefer provides a year-end summary of programme performance and sets the stage for planning in 2019.</p>
<p>December 2018 marked a period of significant vaccination activity, including the launch of Pakistan's nationwide campaign that aimed to vaccinate almost 40 million children before the end of the year. The briefer reports on the outcome of this campaign, including coverage rates in high-risk districts and performance against targets.</p>
<p>The year-end briefer also reviews the full epidemiological picture for 2018: the geographic distribution of 12 cases, the environmental surveillance findings across the year, and the transmission analysis comparing 2018 strains with those circulating in previous years and in Afghanistan.</p>
<p>Key achievements and challenges of 2018 are summarized for programme managers and international partners, with specific attention to areas that exceeded expectations and areas where performance fell short. This honest assessment was intended to guide 2019 programme planning.</p>
<p>In retrospect, the December 2018 briefer captures the programme at what seemed like the threshold of success, just months before a devastating resurgence in 2019 that would see cases jump to 147. The document is therefore studied carefully for early warning signs that, at the time, may not have been adequately heeded.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – December 2018"
      path="/images/polio-briefer/pakistan-polio-update-december-2018-pdf"
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
