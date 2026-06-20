import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Baseline Survey Report – Polio Immunization Coverage & Community Attitudes in South Khyber Pakhtunkhwa | End Polio Pakistan",
  description: "This baseline survey report documents a comprehensive assessment of polio immunization coverage, community attitudes toward vaccination, and health worker...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/Report-on-Baseline-Survey-in-South%20KP.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This baseline survey report documents a comprehensive assessment of polio immunization coverage, community attitudes toward vaccination, and health worker performance in South Khyber Pakhtunkhwa — one of Pakistan's most persistently challenging regions for polio eradication.</p>
<p>South KP, comprising districts such as Tank, Dera Ismail Khan, Bannu, Lakki Marwat, and the Waziristan districts, has historically accounted for a disproportionate share of Pakistan's annual polio cases. Understanding the baseline situation in this region — what coverage levels look like, why parents refuse vaccination, and how communities perceive health workers — is essential for designing effective interventions.</p>
<p>The survey methodology included household interviews, focus group discussions with community members, key informant interviews with local leaders and religious figures, and direct observation of vaccination team performance. Data was collected across multiple districts to capture the geographic diversity of challenges within South KP.</p>
<p>Key findings documented in the report include vaccination coverage rates by district and union council, the most common reasons cited for vaccine refusal, the level of community trust in health workers, and the influence of religious leadership on vaccination attitudes. The report identifies specific geographic and demographic segments requiring priority attention.</p>
<p>Baseline data of this kind is invaluable for programme planners. It provides the evidence base for designing targeted interventions, allocating resources where they are most needed, and measuring the impact of community engagement and social mobilization activities over time.</p>`

  return (
    <PolioInfoPage
      title="Baseline Survey Report – Polio Immunization Coverage & Community Attitudes in South Khyber Pakhtunkhwa | End Polio Pakistan"
      path="/images/reports/report-on-baseline-survey-in-south-kp-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "Multi-Year" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
