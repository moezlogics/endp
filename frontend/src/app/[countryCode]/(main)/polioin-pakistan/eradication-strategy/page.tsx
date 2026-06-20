import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Eradication Strategy | Polio in Pakistan",
  description: "This section outlines the comprehensive strategy employed in Pakistan to eradicate polio and protect children from paralysis. It details the multi-faceted...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/eradication-strategy",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This section outlines the comprehensive strategy employed in Pakistan to eradicate polio and protect children from paralysis. It details the multi-faceted approach that combines vaccination, surveillance, and community engagement to eliminate poliovirus from the country.</p>

<h2>Key Components of the Eradication Strategy</h2>
<p>Vaccination Campaigns: Regular immunization drives are conducted to ensure high vaccination coverage among all children under the age of five.</p>
<p>Surveillance Systems: Robust monitoring mechanisms are in place to detect poliovirus circulation quickly and enable rapid response.</p>
<p>Community Engagement: Strategies are implemented to address vaccine hesitancy and build trust within communities, encouraging widespread participation in vaccination efforts.</p>
<p>Partnerships: Collaboration with national and international stakeholders is crucial for coordinating efforts and leveraging resources effectively.</p>
<p>Understanding this strategy is essential for appreciating the complexity of polio eradication and the commitment required to protect public health.</p>`

  return (
    <PolioInfoPage
      title="Eradication Strategy | Polio in Pakistan"
      path="/polioin-pakistan/eradication-strategy"
      contentHtml={content}
      metrics={[
        { label: "Programme", value: "Polio Eradication" },
        { label: "Coordinator", value: "NEOC Pakistan" },
        { label: "Coverage", value: "Nationwide" },
        { label: "Helpline", value: "1166" }
      ]}
    />
  )
}
