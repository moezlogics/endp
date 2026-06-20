import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan (NEAP) 2018–2019",
  description: "The National Emergency Action Plan (NEAP) for 2018–2019 is one of Pakistan's most comprehensive strategic documents for polio eradication. Developed by the...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/Stories/NEAP-2018-2019.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan (NEAP) for 2018–2019 is one of Pakistan's most comprehensive strategic documents for polio eradication. Developed by the National Emergency Operations Centre in collaboration with provincial governments and international partners, the NEAP outlines the detailed operational framework for eliminating poliovirus during this critical period.</p>
<p>The plan identifies priority geographic areas based on epidemiological data, environmental surveillance results, and vaccination coverage assessments. It sets specific targets for campaign coverage, surveillance sensitivity, and community engagement activities.</p>
<p>Key strategies outlined in the NEAP include multiple national and sub-national immunization campaigns, strengthened environmental surveillance across hundreds of sites, improved microplanning using geographic information systems, and intensified community mobilization to address vaccine refusal.</p>
<p>The plan also addresses programmatic weaknesses identified in previous years, including accountability gaps at the district level, inadequate data quality, and security challenges in Khyber Pakhtunkhwa and Balochistan. It introduces new accountability measures and performance monitoring frameworks.</p>
<p>The 2018–2019 NEAP was developed during a period when Pakistan was experiencing relatively low case numbers, and the goal was to maintain that progress and move decisively toward interrupting transmission. It remains a key reference document for understanding the evolution of Pakistan's eradication strategy and the lessons learned from previous campaign cycles.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan (NEAP) 2018–2019"
      path="/images/stories/neap-2018-2019-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2018" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
