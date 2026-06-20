import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 18th Polio Case",
  description: "This press release confirms the 18th wild poliovirus case detected in Pakistan during the reporting year, continuing the pattern of case accumulation that...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2189-pakistan-reports-18th-polio-case",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the 18th wild poliovirus case detected in Pakistan during the reporting year, continuing the pattern of case accumulation that characterized this period. The affected child's details including district of residence, age, vaccination history, and the type of viral strain detected are documented in the official statement.</p>
<p>The 18th case, like those before it, reflects the ongoing challenge of maintaining comprehensive vaccination coverage across all of Pakistan's high-risk areas simultaneously. Analysis of the affected child's vaccination history typically reveals either a complete absence of vaccination or an inadequate number of doses — highlighting the consequences of missed campaigns for individual children.</p>
<p>Programme officials use each confirmed case as a learning opportunity. Response teams are deployed to the affected district to conduct a rapid assessment, identify other potentially exposed children in the household and community, and launch emergency vaccination activities. Contact tracing and additional environmental sampling help define the scope of ongoing transmission.</p>
<p>The press release includes a direct message to communities in the affected area and beyond: vaccination is the only way to protect children from poliovirus. Parents are urged to cooperate with health workers during all campaigns and to never refuse the vaccine on the basis of false information.</p>
<p>The 18th case also serves as a data point in the annual epidemiological picture, contributing to the programme's understanding of transmission trends and helping managers determine whether current strategies are adequate or whether additional emergency measures are required.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 18th Polio Case"
      path="/media-room/media-releases/2189-pakistan-reports-18th-polio-case"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#18" },
        { label: "Year", value: "recent" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
