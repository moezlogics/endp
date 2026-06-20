import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 71st Polio Case of 2024",
  description: "The confirmation of Pakistan's 71st wild poliovirus case in 2024 arrived in the closing months of what had become a deeply difficult year for the country's...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2591-pakistan-reports-71st-polio-case-of-2024",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The confirmation of Pakistan's 71st wild poliovirus case in 2024 arrived in the closing months of what had become a deeply difficult year for the country's eradication programme. The high case count represented a painful setback after years of painstaking progress and raised urgent questions about the sustainability of the strategies in use.</p>
<p>The 71st case, like many others in 2024, was detected in a district with a documented history of transmission and inadequate vaccination coverage. Laboratory analysis confirmed WPV1, and genetic sequencing connected the strain to an ongoing transmission network spanning multiple high-risk districts.</p>
<p>Programme officials acknowledged the gravity of the situation and outlined emergency measures being implemented: intensified campaign rounds in the highest-burden districts, a comprehensive review of microplanning quality, enhanced engagement with community leaders in areas where vaccine hesitancy persists, and improved cross-border coordination with Afghanistan.</p>
<p>The 71st case also triggered a detailed root cause analysis to understand why progress had reversed so dramatically in 2024. Preliminary findings pointed to immunity gaps created by the COVID-19 era disruptions, inadequate campaign quality in specific districts, and the challenge of maintaining consistent performance across a programme of this scale and complexity.</p>
<p>Despite the challenging numbers, programme officials remained committed to the eradication goal, emphasizing that the tools for ending polio are available and that the challenge is one of consistent execution and sustained community engagement.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 71st Polio Case of 2024"
      path="/media-room/media-releases/2591-pakistan-reports-71st-polio-case-of-2024"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#71" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
