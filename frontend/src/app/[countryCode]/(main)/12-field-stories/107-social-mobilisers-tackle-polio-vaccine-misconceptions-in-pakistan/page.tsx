import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Social Mobilisers Tackle Polio Vaccine Misconceptions in Pakistan",
  description: "This field story highlights the critical work of social mobilizers in Pakistan's polio eradication programme — the communicators and community connectors w...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/12-field-stories/107-social-mobilisers-tackle-polio-vaccine-misconceptions-in-Pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story highlights the critical work of social mobilizers in Pakistan's polio eradication programme — the communicators and community connectors who work year-round to build acceptance for vaccination and correct the false beliefs that drive refusals. Social mobilization is recognized as one of the most important and challenging aspects of eradicating polio in Pakistan.</p>
<p>The story follows social mobilizers as they engage with families, community leaders, teachers, and religious figures in high-risk districts. Their approach is not one of lecturing or hectoring but of patient, respectful dialogue — listening first to understand concerns and then providing information that addresses those specific worries.</p>
<p>Common misconceptions tackled by social mobilizers include claims that the vaccine is haram, that it causes infertility or illness, that it is produced in unhygienic conditions, or that it represents a foreign agenda. Each misconception requires a tailored response, and mobilizers are trained to recognize and address dozens of variants.</p>
<p>The story reveals the emotional intelligence required for this work. Mobilizers must navigate sensitive topics, maintain respect for religious and cultural norms, and persist without confrontation when initially rebuffed. They are often the difference between a household that refuses and one that opens its door.</p>
<p>Social mobilizers serve as the human bridge between the formal health system and the communities it serves. Their work is an essential investment in the social infrastructure of vaccination, building the trust and acceptance that make campaigns possible and ultimately successful.</p>`

  return (
    <PolioInfoPage
      title="Social Mobilisers Tackle Polio Vaccine Misconceptions in Pakistan"
      path="/12-field-stories/107-social-mobilisers-tackle-polio-vaccine-misconceptions-in-pakistan"
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
