import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "New Polio Case in Gilgit-Baltistan – Parents Must Vaccinate Their Children",
  description: "This press release confirms a wild poliovirus case detected in Gilgit-Baltistan, Pakistan's mountainous northern region. The detection of poliovirus in Gil...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2634-new-polio-case-in-gilgit-baltistan-parents-must-vaccinate-their-children",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms a wild poliovirus case detected in Gilgit-Baltistan, Pakistan's mountainous northern region. The detection of poliovirus in Gilgit-Baltistan is particularly alarming because this relatively isolated region had not historically been a major epicenter of polio transmission, suggesting that viral spread had extended beyond the established endemic corridors.</p>
<p>The affected child in the Diamer district suffered acute flaccid paralysis, and laboratory confirmation of WPV1 prompted immediate emergency action. The detection raised serious questions about vaccination coverage in this remote region, which faces extreme geographic challenges including high-altitude communities accessible only by narrow mountain roads or on foot.</p>
<p>Health officials responded immediately by launching emergency vaccination campaigns across Gilgit-Baltistan, prioritizing Diamer district and neighboring areas. Additional vaccination teams were mobilized from provincial reserves and national resources.</p>
<p>The press release contains a direct and urgent appeal to parents in Gilgit-Baltistan to make vaccination their highest priority. It emphasizes that poliovirus respects no geographic boundaries and that no community is safe as long as the virus is circulating anywhere in Pakistan.</p>
<p>Community leaders, school authorities, and religious figures were called upon to support vaccination efforts and help ensure that every child under five receives the life-saving drops. The case serves as a warning that the eradication effort must remain vigilant and comprehensive across all of Pakistan's diverse regions.</p>`

  return (
    <PolioInfoPage
      title="New Polio Case in Gilgit-Baltistan – Parents Must Vaccinate Their Children"
      path="/media-room/media-releases/2634-new-polio-case-in-gilgit-baltistan-parents-must-vaccinate-their-children"
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
