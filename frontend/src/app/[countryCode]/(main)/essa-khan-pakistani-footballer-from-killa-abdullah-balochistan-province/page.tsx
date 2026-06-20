import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Essa Khan – Pakistani Footballer from Killa Abdullah, Balochistan Province",
  description: "This page profiles Essa Khan, a young Pakistani footballer from Killa Abdullah district in Balochistan, whose story has been highlighted by the Pakistan Po...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/essa-khan-pakistani-footballer-from-killa-abdullah-balochistan-province",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This page profiles Essa Khan, a young Pakistani footballer from Killa Abdullah district in Balochistan, whose story has been highlighted by the Pakistan Polio Eradication Programme as an example of how polio vaccination protects children's futures and potential.</p>
<p>Killa Abdullah is one of the high-risk border districts in Balochistan that has historically struggled with poliovirus transmission and low immunization coverage. Stories like Essa Khan's serve as powerful, locally relevant illustrations of why vaccination matters — not in abstract health terms but in terms of real children's real futures and opportunities.</p>
<p>The profile connects polio prevention to aspirations and possibilities. By showcasing a talented young person from one of Pakistan's most challenging polio environments, the programme humanizes the vaccination message and demonstrates that healthy, vaccinated children can achieve remarkable things.</p>
<p>This type of content is part of the programme's broader communications strategy to move beyond fear-based messaging and toward positive, aspirational narratives. When communities see their own children represented as successful and capable, it reinforces positive attitudes toward the health choices that make such success possible.</p>
<p>The page also serves as a reminder that Balochistan, despite its challenges, is home to many talented young Pakistanis whose full potential can only be realized if they grow up healthy and protected from diseases like polio. Every child vaccinated is a future protected.</p>`

  return (
    <PolioInfoPage
      title="Essa Khan – Pakistani Footballer from Killa Abdullah, Balochistan Province"
      path="/essa-khan-pakistani-footballer-from-killa-abdullah-balochistan-province"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Essa Khan – Pakistan..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
