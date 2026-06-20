import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Karachi Electric and UNICEF Unite Against Childhood Preventable Diseases",
  description: "This press release announces a strategic partnership between Karachi Electric, the electricity utility serving Pakistan's largest city, and UNICEF to raise...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/118-karachi-electric-and-unicef-unite-against-childhood-preventable-diseases",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces a strategic partnership between Karachi Electric, the electricity utility serving Pakistan's largest city, and UNICEF to raise awareness and support vaccination against childhood preventable diseases including polio. The partnership targets Karachi's vast urban population, including the densely populated informal settlements where vaccination coverage has historically been low.</p>
<p>Karachi presents unique challenges for polio eradication due to its enormous population, high population density, large numbers of migrants from high-risk provinces, and complex informal settlement structure. Reaching every child in these areas requires massive coordinated effort and creative approaches to awareness.</p>
<p>Under the partnership, Karachi Electric leveraged its network of customer service centers, field staff, and communications channels to spread messages about the importance of vaccination. Staff members were trained to act as community ambassadors for vaccination during their routine interactions with residents.</p>
<p>UNICEF contributed technical expertise, communication materials, and programme coordination support. Together, the partners designed interventions tailored to the specific cultural and demographic context of Karachi's diverse neighborhoods.</p>
<p>The partnership also supported cold chain management by ensuring reliable electricity supply to vaccination centers and cold storage facilities — a critical practical contribution to maintaining vaccine quality in a megacity where power disruptions can be frequent.</p>
<p>This innovative approach to public-private collaboration in Karachi offers lessons for other large urban areas where conventional outreach strategies struggle to achieve adequate coverage.</p>`

  return (
    <PolioInfoPage
      title="Karachi Electric and UNICEF Unite Against Childhood Preventable Diseases"
      path="/media-room/media-releases/118-karachi-electric-and-unicef-unite-against-childhood-preventable-diseases"
      contentHtml={content}
      metrics={[
        { label: "Corporate Partner", value: "Karachi Electric" },
        { label: "Collaborator", value: "UNICEF / NEOC" },
        { label: "Engagement", value: "CSR Initiative" },
        { label: "Focus", value: "Public Awareness" }
      ]}
    />
  )
}
