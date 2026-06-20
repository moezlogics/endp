import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Eradication FAQs (Frequently Asked Questions)",
  description: "The Polio Eradication FAQs provide clear and concise answers to common questions about polio, its prevention, and the global effort to eliminate it. These...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/2018-09-12-11-20-41/faqs",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Polio Eradication FAQs provide clear and concise answers to common questions about polio, its prevention, and the global effort to eliminate it. These questions address key concerns from the public, healthcare providers, and community members.</p>

<h2>Key Topics Covered</h2>
<p>What is Polio?: Defines polio as a highly contagious infectious disease caused by poliovirus that can cause paralysis and death.</p>
<p>How is Polio Prevented?: Explains that polio is effectively prevented through vaccination, particularly the Oral Polio Vaccine (OPV) and Inactivated Polio Vaccine (IPV).</p>
<p>Symptoms and Transmission: Details the symptoms of polio (which can range from mild to severe paralysis) and explains how it spreads through contaminated food, water, and fecal-oral transmission.</p>
<p>Importance of Vaccination: Emphasizes that even though the virus has been eliminated in many parts of the world, continued vaccination is crucial to prevent its resurgence and protect children.</p>
<p>Role of International Organizations: Describes the collaborative efforts of the Global Polio Eradication Initiative (GPEI), involving WHO, UNICEF, Rotary International, and national governments, in coordinating polio eradication strategies.</p>
<p>This FAQ section serves as a valuable resource for accurate information about polio and the ongoing efforts to protect communities from this preventable disease.</p>`

  return (
    <PolioInfoPage
      title="Polio Eradication FAQs (Frequently Asked Questions)"
      path="/2018-09-12-11-20-41/faqs"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Polio Eradication FA..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
