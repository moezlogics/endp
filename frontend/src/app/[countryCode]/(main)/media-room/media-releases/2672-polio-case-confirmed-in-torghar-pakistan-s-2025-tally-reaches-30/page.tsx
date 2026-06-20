import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Case Confirmed in Torghar – Pakistan's 2025 Tally Reaches 30",
  description: "The confirmation of a polio case in Torghar district, Khyber Pakhtunkhwa brings Pakistan's 2025 wild poliovirus tally to 30, reflecting ongoing challenges...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2672-polio-case-confirmed-in-torghar-pakistan-s-2025-tally-reaches-30",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The confirmation of a polio case in Torghar district, Khyber Pakhtunkhwa brings Pakistan's 2025 wild poliovirus tally to 30, reflecting ongoing challenges in containing transmission in the country's most endemic region. Torghar, a remote and mountainous district, presents significant logistical and security challenges for vaccination teams.</p>
<p>This 30th case marks a troubling pace of case accumulation in 2025 that echoes the high case counts seen in 2024. The concentration of cases in KP districts including Torghar, Tank, Bannu, and surrounding areas reflects the deep-rooted transmission chains in this corridor that have proven exceptionally difficult to interrupt.</p>
<p>Health authorities emphasized the urgency of the situation and announced that additional emergency vaccination rounds would be conducted in Torghar and neighboring districts. Cross-district coordination was strengthened to ensure that children from Torghar attending schools or markets in adjacent districts were also captured in vaccination sweeps.</p>
<p>The press release highlights specific vaccination challenges in Torghar including difficult mountain terrain that slows team movement, limited cold chain infrastructure, and communities that in some areas have historically been less accessible to government health workers.</p>
<p>The 30th case milestone prompted a national-level review of the 2025 programme performance to date, with particular focus on whether the high-risk districts of KP were receiving sufficient resources and attention relative to the scale of the challenge they represent.</p>`

  return (
    <PolioInfoPage
      title="Polio Case Confirmed in Torghar – Pakistan's 2025 Tally Reaches 30"
      path="/media-room/media-releases/2672-polio-case-confirmed-in-torghar-pakistan-s-2025-tally-reaches-30"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#30" },
        { label: "Year", value: "2025" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
