import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Prepared for Polio High Season",
  description: "This field story documents the preparations undertaken by Pakistan's Polio Eradication Programme as it gears up for the annual high transmission season — t...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/pakistan-prepared-for-polio-high-season",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story documents the preparations undertaken by Pakistan's Polio Eradication Programme as it gears up for the annual high transmission season — typically the warmer months from May through September when poliovirus spreads most readily through environmental and human contact pathways.</p>
<p>During the high season, the risk of viral transmission increases significantly due to greater population movement, school holidays that change children's daily routines, and the heat that can challenge cold chain integrity if not carefully managed. Children who were missed in previous campaigns are at heightened risk during this period, and any immunity gaps in communities become more dangerous.</p>
<p>The programme's high-season preparedness involves multiple layers of readiness. Vaccine supplies are pre-positioned at district and sub-district cold storage facilities to ensure availability. Vaccination teams are refreshed on protocols, microplanning is updated with the latest household data, and transit vaccination points are reinforced at major movement corridors.</p>
<p>Community mobilization activities are intensified in the weeks before high-season campaigns, with social mobilizers, religious leaders, teachers, and local influencers all engaged to ensure maximum parental awareness and cooperation. Special attention is given to nomadic and mobile populations who move more extensively during the warmer months.</p>
<p>Environmental surveillance sampling is also increased during the high season to provide early warning of any surge in poliovirus circulation. This readiness posture reflects the programme's hard-won understanding that high season success requires preparation that begins weeks before the first vaccination team knocks on the first door.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Prepared for Polio High Season"
      path="/media-room/field-stories/pakistan-prepared-for-polio-high-season"
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
