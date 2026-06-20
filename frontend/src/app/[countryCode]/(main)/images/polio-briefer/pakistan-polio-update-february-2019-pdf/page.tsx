import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – February 2019",
  description: "The Pakistan Polio Update for February 2019 is a monthly briefing document providing a comprehensive snapshot of polio-related activities and data for the...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-FEBRUARY-2019.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for February 2019 is a monthly briefing document providing a comprehensive snapshot of polio-related activities and data for the reporting period. This briefer serves as an essential reference for programme staff, government officials, donors, and international partners tracking Pakistan's eradication progress.</p>
<p>February 2019 was a critical period as Pakistan was experiencing a resurgence in polio cases following a historic low in 2018. The briefer documents case counts by province and district, environmental surveillance results showing the geographic spread of poliovirus in sewage samples, and vaccination campaign coverage data.</p>
<p>The document also summarizes key programmatic actions taken during the month, including emergency campaigns, community outreach activities, and coordination meetings. It highlights challenges identified in the field such as access issues, vaccine refusals, and areas with persistently low immunity levels.</p>
<p>Key performance indicators, maps showing virus circulation, and tables comparing current data with previous periods are typical features of this briefer. These tools help programme managers make evidence-based decisions about where to focus resources.</p>
<p>The February 2019 update is an important historical document that provides context for the significant increase in cases that Pakistan experienced throughout 2019, which ultimately reached 147 cases — the highest in several years and a major setback that prompted emergency reforms in the national programme.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – February 2019"
      path="/images/polio-briefer/pakistan-polio-update-february-2019-pdf"
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
