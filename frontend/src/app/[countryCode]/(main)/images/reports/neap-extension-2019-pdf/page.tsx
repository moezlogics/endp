import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "National Emergency Action Plan Extension 2019 (NEAP Extension 2019)",
  description: "The National Emergency Action Plan Extension for 2019 represents a mid-year programmatic adjustment in response to the alarming resurgence of polio cases t...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/NEAP%20EXTENSION%202019.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The National Emergency Action Plan Extension for 2019 represents a mid-year programmatic adjustment in response to the alarming resurgence of polio cases that Pakistan experienced during the year. When the original NEAP for 2019 proved insufficient to contain the rapid increase in cases, the programme developed this extension document to outline emergency escalation measures.</p>
<p>The extension plan was developed in response to a devastating surge — cases were mounting rapidly and by mid-year it was clear that 2019 would see Pakistan's highest case count in years. The extension document diagnosed the root causes of failure and prescribed emergency interventions to limit further damage.</p>
<p>Key measures outlined in the extension plan included emergency campaign rounds in priority districts that had recorded multiple cases, enhanced supervision and accountability structures with penalties for poor performance, immediate recruitment of additional social mobilization resources, and emergency cross-border coordination with Afghanistan.</p>
<p>The plan also included a frank assessment of structural weaknesses that had contributed to the 2019 resurgence: inadequate microplanning in certain districts, insufficient attention to vaccine hesitancy in specific communities, and gaps in programme accountability that had allowed poor performance to persist without consequences.</p>
<p>The NEAP Extension 2019 is an important document precisely because it was written in the middle of a crisis. It reflects the programme's capacity for honest self-assessment and rapid adaptation, qualities that would prove essential in the difficult years ahead. For researchers and programme planners, it offers valuable lessons on emergency programme management and adaptive response.</p>`

  return (
    <PolioInfoPage
      title="National Emergency Action Plan Extension 2019 (NEAP Extension 2019)"
      path="/images/reports/neap-extension-2019-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "2019" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
