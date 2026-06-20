import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 73rd Polio Case of 2024",
  description: "This press release documents Pakistan's 73rd confirmed wild poliovirus type 1 case of 2024, marking one of the highest annual case counts the country had r...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2593-pakistan-reports-73rd-polio-case-of-2024",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release documents Pakistan's 73rd confirmed wild poliovirus type 1 case of 2024, marking one of the highest annual case counts the country had recorded in recent years. The 73rd case was confirmed in the final weeks of the year, representing a somber milestone as Pakistan prepared to enter 2025 with the eradication effort under intense scrutiny.</p>
<p>The relentless accumulation of cases through 2024 exposed deep structural weaknesses in the programme that had not been fully addressed despite years of international attention and investment. Key contributing factors included persistent vaccine hesitancy in certain communities, security-related access restrictions, inadequate microplanning in some districts, and the continuing challenge of cross-border transmission from Afghanistan.</p>
<p>The press release details the affected child's location, the strain of virus detected, and the immediate response measures being taken. It also situates this case within the broader annual tally and notes the geographic distribution of 2024 cases.</p>
<p>Programme officials and international partners expressed determination to learn from 2024 and implement stronger accountability and operational improvements in 2025. A comprehensive review of the 2024 case data was commissioned to identify specific failure points and inform the development of an enhanced national strategy.</p>
<p>Despite the high case count, the press release emphasizes that the scientific and operational tools for eradication exist and that the challenge is fundamentally one of programme execution, community engagement, and sustained political will.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 73rd Polio Case of 2024"
      path="/media-room/media-releases/2593-pakistan-reports-73rd-polio-case-of-2024"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#73" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
