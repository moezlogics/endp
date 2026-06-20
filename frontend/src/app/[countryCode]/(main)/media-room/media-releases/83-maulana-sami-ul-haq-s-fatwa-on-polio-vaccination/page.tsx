import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Maulana Sami ul Haq's Fatwa on Polio Vaccination",
  description: "This nationwide polio vaccination campaign represents a critical component of Pakistan's strategy to interrupt wild poliovirus transmission and protect mil...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/83-maulana-sami-ul-haq-s-fatwa-on-polio-vaccination",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This nationwide polio vaccination campaign represents a critical component of Pakistan's strategy to interrupt wild poliovirus transmission and protect millions of vulnerable children. Conducted under the coordination of the National Emergency Operations Centre (NEOC), the campaign deployed over 350,000 trained frontline workers across all provinces, administrative territories, and federally administered areas.</p>

<h2>Campaign Scope &amp; Operational Details</h2>
<p>The campaign targeted all children under five years of age through a comprehensive house-to-house vaccination strategy. Each two-member team was assigned a specific microplan covering approximately 250 households, ensuring systematic coverage of every neighborhood, village, and settlement within their designated area. Teams carried insulated vaccine carriers maintaining the cold chain at 2-8°C throughout the campaign period.</p>
<p>Special transit vaccination posts were established at major interprovincial highways, railway stations, bus terminals, and border crossings to capture children from mobile and migrant populations who might otherwise be missed during household visits. These transit points operated for extended hours to maximize coverage among traveling families.</p>

<h2>Community Mobilization &amp; Communication</h2>
<p>Prior to campaign commencement, over 40,000 trained social mobilizers conducted pre-campaign community engagement activities. These included household visits to address parental concerns, engagement with local religious leaders and community elders, and distribution of information materials explaining the safety and importance of the polio vaccine.</p>
<p>Television and radio advertisements featuring public health messages were broadcast across all major networks. Social media campaigns reached younger demographics through targeted messaging on platforms widely used in Pakistan. Mosque announcements in many communities reinforced the campaign schedule and encouraged full participation.</p>
<p>The campaign results are being compiled through Pakistan's real-time digital monitoring system, which tracks team movement, household coverage, and vaccination counts at district, provincial, and national levels. Post-campaign assessment surveys will verify coverage quality and identify any areas requiring follow-up mop-up activities.</p>`

  return (
    <PolioInfoPage
      title="Maulana Sami ul Haq's Fatwa on Polio Vaccination"
      path="/media-room/media-releases/83-maulana-sami-ul-haq-s-fatwa-on-polio-vaccination"
      contentHtml={content}
      metrics={[
        { label: "Target", value: "45M+ Children" },
        { label: "Workers", value: "350,000+" },
        { label: "Coverage", value: "Nationwide" },
        { label: "Year", value: "recent" }
      ]}
    />
  )
}
