import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Case Reported from Killa Abdullah",
  description: "This press release confirms the detection of a new wild poliovirus type 1 (WPV1) case in Killa Abdullah district, Balochistan province. Killa Abdullah, loc...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2460-polio-case-reported-from-killa-abdullah",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the detection of a new wild poliovirus type 1 (WPV1) case in Killa Abdullah district, Balochistan province. Killa Abdullah, located along the Pakistan-Afghanistan border, has historically been a high-risk area for polio transmission due to its geographic position, population movement, and immunization coverage challenges.</p>
<p>The National Institute of Health's Regional Reference Laboratory confirmed the case through environmental and clinical testing. The affected child had not received adequate doses of the oral polio vaccine (OPV), underlining the persistent challenge of reaching every child in remote and conflict-affected areas.</p>
<p>In response to this confirmed case, health authorities announced an emergency vaccination campaign targeting thousands of children in surrounding districts. Security forces were mobilized to ensure the safety of vaccination teams operating in the region.</p>
<p>This announcement also emphasizes the importance of cross-border coordination with Afghanistan, as genetic sequencing of the virus suggests transboundary transmission routes are active. Health officials reiterated the need for parents and communities in border areas to cooperate fully with vaccination teams.</p>
<p>The Killa Abdullah case is a reminder that no region in Pakistan can be considered safe until poliovirus transmission is completely interrupted across the country and the wider region.</p>`

  return (
    <PolioInfoPage
      title="Polio Case Reported from Killa Abdullah"
      path="/media-room/media-releases/2460-polio-case-reported-from-killa-abdullah"
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
