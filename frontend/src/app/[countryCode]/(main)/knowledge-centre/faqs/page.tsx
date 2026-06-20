import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description: "The Frequently Asked Questions (FAQs) section addresses common queries about polio, vaccination, and eradication efforts. It provides clear, concise inform...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/knowledge-centre/faqs",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Frequently Asked Questions (FAQs) section addresses common queries about polio, vaccination, and eradication efforts. It provides clear, concise information to enhance public understanding and support for immunization programs.</p>

<h2>Key Questions Covered</h2>
<p>What is Polio?: Defines polio as a highly contagious infectious disease caused by the poliovirus that can lead to paralysis or death.</p>
<p>Symptoms of Polio: Outlines the symptoms, which can range from mild (fever, sore throat) to severe (paralysis).</p>
<p>How Polio Spreads: Explains that the virus spreads through contaminated food, water, or direct contact with infected individuals.</p>
<p>Prevention and Vaccination: Highlights the effectiveness of the Oral Polio Vaccine (OPV) and Inactivated Polio Vaccine (IPV) in preventing polio.</p>
<p>Importance of Vaccination: Emphasizes that vaccination is the most effective way to protect children from polio and prevent its re-emergence.</p>
<p>Role of International Organizations: Describes the collaborative efforts of organizations like WHO, UNICEF, and Rotary International in global polio eradication.</p>
<p>This FAQ section serves as a valuable resource for accurate information about polio and the critical importance of vaccination in protecting communities.</p>`

  return (
    <PolioInfoPage
      title="Frequently Asked Questions (FAQs)"
      path="/knowledge-centre/faqs"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Frequently Asked Que..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
