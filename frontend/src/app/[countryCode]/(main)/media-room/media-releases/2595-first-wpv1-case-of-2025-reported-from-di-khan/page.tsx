import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "First WPV1 Case of 2025 Reported from DI Khan",
  description: "This press release confirms the first wild poliovirus type 1 case of 2025 in Pakistan, detected in Dera Ismail Khan district of Khyber Pakhtunkhwa. The con...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2595-first-wpv1-case-of-2025-reported-from-di-khan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the first wild poliovirus type 1 case of 2025 in Pakistan, detected in Dera Ismail Khan district of Khyber Pakhtunkhwa. The confirmation of the first case of any year is a significant moment that sets the tone for programme urgency and response intensity in the months ahead.</p>
<p>Dera Ismail Khan has been one of Pakistan's most persistently challenging districts for polio eradication. Located in southern KP, it borders Waziristan and has experienced repeated poliovirus transmission due to population movement, security challenges, and historically variable vaccination coverage. Its first case of 2025 was therefore not a surprise, but it was no less concerning for that.</p>
<p>The affected child had not been adequately vaccinated, and investigation of the household and surrounding community revealed other children who were also behind on vaccination. Emergency activities were launched immediately, including house-to-house vaccination in the affected area and intensified outreach to households that had previously refused.</p>
<p>The press release uses the first 2025 case as an opportunity to mobilize public attention and programme urgency. It calls on all stakeholders — government, community leaders, parents, and international partners — to treat polio elimination as an urgent national priority and to commit maximum effort to preventing a repeat of 2024's high case count.</p>
<p>The first case of 2025 from DI Khan is a call to action that the programme takes with the utmost seriousness.</p>`

  return (
    <PolioInfoPage
      title="First WPV1 Case of 2025 Reported from DI Khan"
      path="/media-room/media-releases/2595-first-wpv1-case-of-2025-reported-from-di-khan"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#1" },
        { label: "Year", value: "2025" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
