import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Two New Polio Cases Confirmed in Khyber Pakhtunkhwa",
  description: "This press release confirms the detection of two new wild poliovirus type 1 (WPV1) cases in Khyber Pakhtunkhwa (KP) province, further evidence of ongoing p...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2631-two-new-polio-cases-confirmed-in-khyber-pakhtunkhwa",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the detection of two new wild poliovirus type 1 (WPV1) cases in Khyber Pakhtunkhwa (KP) province, further evidence of ongoing poliovirus transmission in one of Pakistan's most challenging regions. KP has historically accounted for the largest share of Pakistan's annual polio burden.</p>
<p>The two newly confirmed children suffered acute flaccid paralysis, the primary clinical manifestation of poliovirus infection. Laboratory analysis at the National Institute of Health confirmed the presence of WPV1 in stool samples. Genetic analysis of the viral strains provides insights into the likely transmission chains and helps programme managers understand the geographic spread of the virus.</p>
<p>Health authorities have responded by launching emergency immunization activities in the affected districts and surrounding areas. Social mobilizers have been deployed to speak with families, understand the reasons for missed vaccinations, and encourage full participation in upcoming campaigns.</p>
<p>KP's high case count reflects the combined impact of conflict-affected areas, high-risk mobile populations, vaccine hesitancy in certain communities, and the persistent challenge of reaching children in mountainous and inaccessible terrain.</p>
<p>The confirmation of these cases reinforces the need for sustained commitment, adequate resources, and community cooperation in KP. Programme officials emphasize that every missed child represents a potential link in the transmission chain, making comprehensive vaccination coverage essential.</p>`

  return (
    <PolioInfoPage
      title="Two New Polio Cases Confirmed in Khyber Pakhtunkhwa"
      path="/media-room/media-releases/2631-two-new-polio-cases-confirmed-in-khyber-pakhtunkhwa"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "Confirmed" },
        { label: "Year", value: "recent" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
