import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "North Waziristan Confirms Eighth Wild Polio Case",
  description: "This press release confirms the eighth wild poliovirus case detected in North Waziristan during the reporting period, underlining the district's status as...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2167-north-waziristan-confirms-eighth-wild-polio-case",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the eighth wild poliovirus case detected in North Waziristan during the reporting period, underlining the district's status as one of Pakistan's most critical and challenging polio hotspots. North Waziristan has been at the center of Pakistan's polio problem for years, combining conflict-related vaccination access challenges with persistent community resistance.</p>
<p>The confirmation of eight cases from a single district highlights the depth of the transmission problem in this area. North Waziristan's high-risk status stems from a complex combination of factors: years of conflict that disrupted vaccination campaigns and allowed large pools of unimmunized children to accumulate, active security threats that continue to limit vaccination access in certain areas, and communities that have been targeted by anti-vaccination propaganda spread by extremist groups.</p>
<p>The eighth case announcement prompted urgent consultations between the federal government, KP provincial authorities, security agencies, and international partners. Emergency vaccination plans were activated, and diplomatic efforts were intensified to ensure community cooperation.</p>
<p>Health officials emphasized that the concentration of cases in North Waziristan makes it one of the highest priorities for the national programme. The district receives disproportionate technical support, resources, and supervisory attention relative to its size.</p>
<p>The Waziristan situation has drawn significant international attention and serves as a powerful argument for the need to address both the public health and security dimensions of polio eradication simultaneously.</p>`

  return (
    <PolioInfoPage
      title="North Waziristan Confirms Eighth Wild Polio Case"
      path="/media-room/media-releases/2167-north-waziristan-confirms-eighth-wild-polio-case"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "Confirmed" },
        { label: "Year", value: "recent" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
