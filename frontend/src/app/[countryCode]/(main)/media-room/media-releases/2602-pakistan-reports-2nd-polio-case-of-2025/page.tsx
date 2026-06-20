import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 2nd Polio Case of 2025",
  description: "This press release confirms Pakistan's second confirmed wild poliovirus case of 2025, coming early in the year and signaling that despite hopes for improve...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2602-pakistan-reports-2nd-polio-case-of-2025",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms Pakistan's second confirmed wild poliovirus case of 2025, coming early in the year and signaling that despite hopes for improvement after the difficult 2024 experience, poliovirus transmission was continuing into the new year. The early confirmation of a second case heightened programme urgency and triggered intensified response measures.</p>
<p>The affected child, confirmed positive through the Regional Reference Laboratory, suffered acute flaccid paralysis in a district with a history of ongoing transmission. Investigation teams moved quickly to understand the transmission chain, identify other potentially exposed children, and launch emergency vaccination in surrounding areas.</p>
<p>The press release acknowledges the challenging start to 2025 while emphasizing the programme's determination to improve performance compared to the previous year. Key measures announced include enhanced campaign quality assurance processes, strengthened accountability at district level, and increased engagement with community leaders in areas where vaccine hesitancy persists.</p>
<p>International partners expressed concern about the early cases but reaffirmed their commitment to supporting Pakistan through additional technical assistance and funding. WHO and UNICEF deployed additional field support to high-risk districts.</p>
<p>The second 2025 case is an early test of the programme's resolve and a reminder that eradication requires consistent, high-quality performance every month of the year. Programme officials remained cautiously optimistic that the reforms implemented following the 2024 review would yield improvements as the year progressed.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 2nd Polio Case of 2025"
      path="/media-room/media-releases/2602-pakistan-reports-2nd-polio-case-of-2025"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#2" },
        { label: "Year", value: "2025" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
