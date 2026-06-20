import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Islamic Advisory Group Adopts Anti-Polio Plan",
  description: "This press release announces the adoption of a formal anti-polio action plan by Pakistan's Islamic Advisory Group, a body of prominent religious scholars c...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/242-islamic-advisory-group-adopts-anti-polio-plan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces the adoption of a formal anti-polio action plan by Pakistan's Islamic Advisory Group, a body of prominent religious scholars convened to provide religious guidance on the polio vaccination programme. The adoption of this plan marked a major step in harnessing religious leadership to support immunization activities.</p>
<p>The Islamic Advisory Group's anti-polio plan was developed through extensive consultations between religious scholars, health professionals, and programme coordinators. It includes a series of concrete commitments by participating scholars to actively promote vaccination in their communities, mosques, and educational institutions.</p>
<p>Key elements of the plan include the issuance of fatwas declaring vaccination permissible and recommended, the engagement of mosque networks to broadcast vaccination messages before Friday prayers, and the training of religious educators to address vaccine-related misconceptions in their teachings.</p>
<p>Religious scholars are uniquely positioned to influence attitudes toward vaccination in Pakistan because their authority in matters of permissibility and religious duty is widely respected across communities. When credible scholars endorse vaccination in religious terms, it can overcome resistance that public health messaging alone cannot address.</p>
<p>The adoption of this plan was praised by the National Emergency Operations Centre as a breakthrough in community engagement strategy. It demonstrated that when religious and health authorities work in partnership rather than in conflict, the barriers to vaccination acceptance can be significantly reduced, bringing Pakistan closer to the day when polio is permanently eliminated.</p>`

  return (
    <PolioInfoPage
      title="Islamic Advisory Group Adopts Anti-Polio Plan"
      path="/media-room/media-releases/242-islamic-advisory-group-adopts-anti-polio-plan"
      contentHtml={content}
      metrics={[
        { label: "Delegation Type", value: "GPEI Global Board" },
        { label: "Review Focus", value: "NEOC Operations" },
        { label: "Key Finding", value: "Excellent Dedication" },
        { label: "Global Status", value: "Urgent Priority" }
      ]}
    />
  )
}
