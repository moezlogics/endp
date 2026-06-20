import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 74th Polio Case of 2024",
  description: "This media release confirms Pakistan's 74th wild poliovirus type 1 (WPV1) case of 2024, marking a significant surge compared to the previous year when only...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2601-pakistan-reports-74th-polio-case-of-2025",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This media release confirms Pakistan's 74th wild poliovirus type 1 (WPV1) case of 2024, marking a significant surge compared to the previous year when only six cases were recorded nationwide. The high case count reflects the challenges of reaching every child in endemic and high-risk areas.</p>
<p>The confirmed case adds to a growing tally concentrated primarily in Khyber Pakhtunkhwa and Balochistan provinces, where conflict, difficult terrain, and vaccine hesitancy have created persistent gaps in immunization coverage. The affected child showed signs of acute flaccid paralysis and was confirmed positive through laboratory testing.</p>
<p>Programme officials express deep concern over the rise in cases and acknowledge that the increase is partly a consequence of disrupted vaccination activities in previous years, combined with population movement and cross-border transmission from Afghanistan.</p>
<p>In response, the National Emergency Operations Centre has outlined a series of emergency measures including additional vaccination rounds, strengthened surveillance, intensified community outreach, and renewed engagement with local leaders in affected areas.</p>
<p>The 74th case is a sobering milestone that underscores the urgency of the eradication effort. Pakistan remains one of only two countries in the world where wild poliovirus has never been interrupted, and every new case represents a child whose life has been permanently altered by a preventable disease.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 74th Polio Case of 2024"
      path="/media-room/media-releases/2601-pakistan-reports-74th-polio-case-of-2025"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#74" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
