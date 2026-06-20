import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) 2017–2018",
  description: "The National Emergency Action Plan for 2017–2018 was developed during a period of significant optimism in Pakistan's eradication journey. Following the his...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP-2017-2018-LR.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan for 2017–2018 was developed during a period of significant optimism in Pakistan's eradication journey. Following the historic low of only eight cases in 2017, the 2017–2018 NEAP was designed to build on this momentum and move decisively toward interrupting poliovirus transmission.</p>
<p>The plan outlined strategies to maintain and improve upon the gains of 2017, recognizing that previous low-case periods had been followed by resurgences. Key priorities included sustaining high campaign quality throughout the year, expanding environmental surveillance coverage, and strengthening routine immunization to build population-level immunity between campaigns.</p>
<p>The 2017–2018 NEAP introduced enhanced accountability frameworks at district and union council levels, recognizing that programmatic quality ultimately depended on local execution. District review meetings, performance dashboards, and supervisory checklists were systematized across all high-risk areas.</p>
<p>Community engagement was identified as a critical priority, with specific plans for working with religious scholars, community elders, and women's networks in areas where vaccine hesitancy remained a challenge. The role of female health workers was formalized and expanded in this NEAP.</p>
<p>In retrospect, the 2017–2018 period saw Pakistan maintain relatively low case numbers before a significant resurgence in 2019. The NEAP for this period is therefore studied carefully to understand both what worked and what structural vulnerabilities remained unaddressed despite the apparent progress of 2017.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) 2017–2018"
      path="/images/reports/neap-2017-2018-lr-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2017" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
