import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – August 2018",
  description: "The Pakistan Polio Update for August 2018 documents a period of continued strong performance in what would prove to be one of Pakistan's best recent years...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-August-2018.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for August 2018 documents a period of continued strong performance in what would prove to be one of Pakistan's best recent years for eradication progress. August falls in the heart of the high-transmission season, making the data particularly significant for understanding how well the programme is maintaining immunity levels when the virus's transmission potential is highest.</p>
<p>The August briefer reports on mid-year case counts, which by August 2018 were tracking at a very low level compared to historical norms. This performance was a result of sustained campaign quality improvements, stronger accountability systems, and enhanced community engagement strategies implemented in the preceding two years.</p>
<p>Environmental surveillance data for August 2018, while showing some continued poliovirus positivity in high-risk areas, showed a narrowing geographic footprint compared to previous years. The combination of low clinical cases and contracting environmental positivity was seen as encouraging evidence of genuine progress.</p>
<p>The briefer covers major campaign rounds conducted during the summer months, their geographic coverage, and performance against targets. It also updates on community mobilization activities including the engagement of religious leaders during the Eid period — traditionally a time when families gather and when vaccination messaging can reach large audiences.</p>
<p>The August 2018 update is a useful benchmark document showing what Pakistan's programme looked like when operating at a relatively high level of performance, providing lessons applicable to subsequent periods when performance deteriorated.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – August 2018"
      path="/images/polio-briefer/pakistan-polio-update-august-2018-pdf"
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
