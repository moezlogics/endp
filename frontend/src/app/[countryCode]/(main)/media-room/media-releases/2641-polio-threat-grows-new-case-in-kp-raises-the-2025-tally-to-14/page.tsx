import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Threat Grows: New Case in KP Raises the 2025 Tally to 14",
  description: "This press release marks a concerning milestone: the 14th confirmed wild poliovirus case of 2025 in Pakistan, detected in Khyber Pakhtunkhwa province. The...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2641-polio-threat-grows-new-case-in-kp-raises-the-2025-tally-to-14",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release marks a concerning milestone: the 14th confirmed wild poliovirus case of 2025 in Pakistan, detected in Khyber Pakhtunkhwa province. The growing tally heightens alarm about the pace of transmission in 2025 and the adequacy of current programme responses.</p>
<p>Khyber Pakhtunkhwa's dominance in the case count reflects the structural challenges the province faces: high-risk border districts, conflict-affected communities, significant nomadic and mobile populations, and historically variable campaign quality. Despite repeated interventions, certain districts in KP continue to produce cases year after year.</p>
<p>The 14th case announcement emphasizes the threat posed not just to KP but to the entire country. As poliovirus circulates in KP, it has the potential to spread to provinces that have maintained relative freedom from clinical cases through population movement.</p>
<p>Programme officials outline the specific emergency measures being implemented: intensified campaigns in the affected district and surrounding areas, enhanced environmental surveillance to map the extent of viral circulation, and strengthened community engagement in areas where refusals remain a challenge.</p>
<p>The press release also issues a national call to action, urging all Pakistanis to support vaccination efforts. It notes that the window for interrupting transmission during the summer travel season is critical and that every household that welcomes a vaccination team brings Pakistan one step closer to ending this ancient disease.</p>`

  return (
    <PolioInfoPage
      title="Polio Threat Grows: New Case in KP Raises the 2025 Tally to 14"
      path="/media-room/media-releases/2641-polio-threat-grows-new-case-in-kp-raises-the-2025-tally-to-14"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "Confirmed" },
        { label: "Year", value: "2025" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
