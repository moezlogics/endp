import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports Fourth Polio Case of 2024",
  description: "This press release confirms the fourth wild poliovirus type 1 (WPV1) case detected in Pakistan in 2024. The early confirmation of a fourth case so soon int...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2441-pakistan-reports-fourth-polio-case-of-2024",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the fourth wild poliovirus type 1 (WPV1) case detected in Pakistan in 2024. The early confirmation of a fourth case so soon into the year raised immediate alarm within the Pakistan Polio Eradication Programme, signaling that 2024 could prove to be a more challenging year than 2023, when only six cases were recorded nationwide.</p>
<p>The affected child, residing in a high-risk district, was confirmed positive through the Regional Reference Laboratory at the National Institute of Health. The child had experienced acute flaccid paralysis — the sudden onset of limb weakness that is the hallmark clinical sign of poliovirus infection. Investigation revealed inadequate vaccination history, with the child having missed one or more recommended campaign rounds.</p>
<p>Programme officials responded immediately by deploying response teams to the affected district and surrounding areas. Emergency vaccination activities were launched, and additional environmental samples were collected to map the geographic extent of viral circulation.</p>
<p>Genetic sequencing of the detected strain helped trace transmission links with previous cases and with viral strains circulating in Afghanistan, confirming the transboundary nature of ongoing transmission in the Pakistan-Afghanistan endemic zone.</p>
<p>The fourth case of 2024 prompted serious discussion within the NEOC and among international partners about whether the programme's current strategies were adequate for the scale of the challenge. Officials called for immediate strengthening of campaign quality, community engagement, and district-level accountability in preparation for the months ahead.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports Fourth Polio Case of 2024"
      path="/media-room/media-releases/2441-pakistan-reports-fourth-polio-case-of-2024"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "Confirmed" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
