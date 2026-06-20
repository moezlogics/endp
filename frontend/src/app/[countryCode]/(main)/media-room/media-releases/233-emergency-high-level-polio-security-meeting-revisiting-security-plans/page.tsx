import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Emergency High Level Polio Security Meeting: Revisiting Security Plans",
  description: "This press release reports on an emergency high-level meeting convened to review and revise security plans for polio vaccination teams operating in high-ri...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/233-emergency-high-level-polio-security-meeting-revisiting-security-plans",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release reports on an emergency high-level meeting convened to review and revise security plans for polio vaccination teams operating in high-risk areas of Pakistan. The meeting was called in response to a series of attacks on vaccination workers that had claimed lives and disrupted campaign operations.</p>
<p>Senior officials from the National Emergency Operations Centre, provincial governments, interior ministries, and law enforcement agencies participated in the meeting. The agenda focused on identifying security gaps, reviewing existing protection protocols, and agreeing on enhanced measures to safeguard health workers going forward.</p>
<p>The meeting concluded with a set of concrete commitments: increased police escort for vaccination teams in red-zone areas, improved intelligence sharing to anticipate threats, enhanced training for security personnel accompanying vaccinators, and stronger accountability for district-level security arrangements.</p>
<p>Officials also discussed community-level interventions to reduce the social environment that enables violence against health workers. Engaging trusted community figures — including tribal elders, religious leaders, and local politicians — was identified as essential for creating a protective social shield around vaccination activities.</p>
<p>The emergency meeting underscored the gravity of the security challenge and the programme's determination to continue operations despite threats. It sent a clear message: Pakistan's commitment to ending polio would not be undermined by those seeking to use health workers as targets in broader political or ideological conflicts.</p>`

  return (
    <PolioInfoPage
      title="Emergency High Level Polio Security Meeting: Revisiting Security Plans"
      path="/media-room/media-releases/233-emergency-high-level-polio-security-meeting-revisiting-security-plans"
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
