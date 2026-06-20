import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 69th WPV1 Case of 2024",
  description: "This media release confirms Pakistan's 69th confirmed case of wild poliovirus type 1 in 2024, continuing an alarming trend of case accumulation that year....",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2588-pakistan-reports-69th-wpv1-case-of-2024",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This media release confirms Pakistan's 69th confirmed case of wild poliovirus type 1 in 2024, continuing an alarming trend of case accumulation that year. The affected child, from a high-risk district in Pakistan, experienced acute flaccid paralysis — the devastating hallmark of poliovirus infection that can result in permanent disability.</p>
<p>The confirmation follows laboratory analysis at the National Institute of Health's Regional Reference Laboratory, which identified WPV1 in stool samples collected from the patient. Genetic sequencing of the virus strain provides crucial data for understanding the ongoing transmission network within Pakistan and its connection to viral strains circulating in neighboring Afghanistan.</p>
<p>Health officials expressed concern that the 69th case indicates continued virus circulation despite intensive vaccination campaigns conducted throughout 2024. The high case count is attributed to immunity gaps in specific communities, persistent vaccine hesitancy among certain groups, and the challenge of maintaining campaign quality across all high-risk districts simultaneously.</p>
<p>The announcement was accompanied by a call to action for parents and community leaders to support upcoming vaccination rounds. Health teams were deployed to the affected district and surrounding areas for emergency response campaigns.</p>
<p>Each confirmed case is a painful reminder of the human cost of the unfinished eradication effort. The 69th case of 2024 reinforces the urgency of reaching every child and the need for renewed public and government commitment to ending this preventable disease.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 69th WPV1 Case of 2024"
      path="/media-room/media-releases/2588-pakistan-reports-69th-wpv1-case-of-2024"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#69" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
