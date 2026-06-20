import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Surveillance for Polio: The Key to Finding Poliovirus in Its Last Hiding Places",
  description: "This field story delves into the critical and often underappreciated world of polio surveillance — the system that detects poliovirus in its remaining hidi...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/surveillance-for-polio-the-key-to-finding-poliovirus-in-its-last-hiding-places",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story delves into the critical and often underappreciated world of polio surveillance — the system that detects poliovirus in its remaining hiding places before it can spread further. As Pakistan moves closer to interrupting transmission, surveillance becomes increasingly important: finding the last traces of the virus is as challenging as it is essential.</p>
<p>The story follows surveillance officers as they collect sewage samples, interview families of children with acute flaccid paralysis, and conduct community surveys in high-risk areas. Their work is painstaking, methodical, and conducted under conditions that can be physically demanding and sometimes dangerous.</p>
<p>Pakistan operates one of the largest and most sophisticated poliovirus surveillance networks in the world. The acute flaccid paralysis (AFP) surveillance system monitors children who develop sudden weakness or paralysis, ensuring that all cases are rapidly investigated and tested for poliovirus. The environmental surveillance system tests sewage from hundreds of sites across the country.</p>
<p>The field story highlights the expertise, dedication, and collaboration required to maintain surveillance quality. Laboratory technicians, epidemiologists, field officers, and community informants all contribute to a system that must be both sensitive enough to detect rare events and specific enough to avoid false alarms.</p>
<p>As poliovirus becomes rarer, the challenge of maintaining surveillance sensitivity increases. This story celebrates the surveillance heroes whose work ensures that the last traces of poliovirus in Pakistan will not go undetected.</p>`

  return (
    <PolioInfoPage
      title="Surveillance for Polio: The Key to Finding Poliovirus in Its Last Hiding Places"
      path="/media-room/field-stories/surveillance-for-polio-the-key-to-finding-poliovirus-in-its-last-hiding-places"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus Area", value: "Community Reach" },
        { label: "Role", value: "Frontline Mobilizer" },
        { label: "Status", value: "Field Report" }
      ]}
    />
  )
}
