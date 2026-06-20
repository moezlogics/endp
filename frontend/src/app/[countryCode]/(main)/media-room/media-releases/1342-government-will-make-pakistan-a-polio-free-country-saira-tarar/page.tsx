import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Government Will Make Pakistan a Polio-Free Country: Saira Tarar",
  description: "This press release captures a powerful commitment made by Federal Minister for Health Saira Afzal Tarar, who declared unequivocally that the government of...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/1342-government-will-make-pakistan-a-polio-free-country-saira-tarar",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release captures a powerful commitment made by Federal Minister for Health Saira Afzal Tarar, who declared unequivocally that the government of Pakistan would make the country polio-free. Her statement came at a critical moment in the programme when increased accountability and political will were needed to sustain momentum.</p>
<p>Minister Tarar's declaration emphasized the government's ownership of the eradication agenda and its responsibility to ensure that every Pakistani child is protected from poliovirus. She directed provincial governments, district administrations, and health departments to treat polio eradication as a priority that would be monitored at the highest levels of government.</p>
<p>The minister acknowledged the complex challenges the programme faces — from security threats in tribal areas to vaccine hesitancy in conservative communities — but expressed confidence that with the right strategy, resources, and community engagement, these obstacles could be overcome.</p>
<p>Her commitment was particularly significant because it signaled political accountability. When senior ministers publicly declare an intention to achieve a health milestone, they create a political incentive structure that can drive better performance throughout the bureaucracy.</p>
<p>The press release also highlights coordinated government measures being taken, including enhanced security for vaccination teams, increased funding for campaigns, and new accountability frameworks for district health officers. Minister Tarar's declaration remains an important statement of national commitment to one of Pakistan's most important public health goals.</p>`

  return (
    <PolioInfoPage
      title="Government Will Make Pakistan a Polio-Free Country: Saira Tarar"
      path="/media-room/media-releases/1342-government-will-make-pakistan-a-polio-free-country-saira-tarar"
      contentHtml={content}
      metrics={[
        { label: "Oversight", value: "Federal & Provincial" },
        { label: "Policy Level", value: "National Emergency" },
        { label: "Year", value: "2024" },
        { label: "Coordination", value: "NEOC / EOCs" }
      ]}
    />
  )
}
