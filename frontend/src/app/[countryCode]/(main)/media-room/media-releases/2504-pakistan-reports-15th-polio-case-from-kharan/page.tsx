import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 15th Polio Case from Kharan",
  description: "This press release confirms a polio case detected in Kharan district, Balochistan, which represents the 15th wild poliovirus case recorded by Pakistan in 2...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2504-pakistan-reports-15th-polio-case-from-kharan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms a polio case detected in Kharan district, Balochistan, which represents the 15th wild poliovirus case recorded by Pakistan in 2024. Kharan is a remote, arid district in southern Balochistan where harsh geographic conditions, limited health infrastructure, and low immunization coverage create persistent challenges for the eradication effort.</p>
<p>The affected child suffered acute flaccid paralysis and was confirmed positive through laboratory testing. The virus strain detected in Kharan was analyzed genetically to trace its origins and identify potential transmission links with cases in other districts or with viral strains circulating in Afghanistan.</p>
<p>Balochistan as a whole accounts for a disproportionate share of Pakistan's annual polio cases relative to its population size. The province's vast geographic area, nomadic communities, cross-border population movement, and security challenges make it one of the most complex operational environments for any public health programme.</p>
<p>In response to the Kharan case, health authorities launched emergency vaccination activities and increased surveillance intensity in the surrounding region. Community mobilizers were deployed to engage with local families and religious leaders to build support for the vaccination response.</p>
<p>This case further illustrates the need for enhanced focus on Balochistan within Pakistan's national eradication strategy, including improved logistics for remote districts, greater investment in community trust-building, and stronger collaboration with provincial authorities to reach every child regardless of how far they live from the nearest health facility.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 15th Polio Case from Kharan"
      path="/media-room/media-releases/2504-pakistan-reports-15th-polio-case-from-kharan"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#15" },
        { label: "Year", value: "recent" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
