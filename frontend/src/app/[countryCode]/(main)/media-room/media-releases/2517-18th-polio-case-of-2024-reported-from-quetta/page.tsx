import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "18th Polio Case of 2024 Reported from Quetta",
  description: "This press release confirms the 18th wild poliovirus case in Pakistan for 2024, detected in Quetta, the provincial capital of Balochistan. Quetta has histo...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2517-18th-polio-case-of-2024-reported-from-quetta",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms the 18th wild poliovirus case in Pakistan for 2024, detected in Quetta, the provincial capital of Balochistan. Quetta has historically been one of the most significant sites of poliovirus circulation in Pakistan, owing to its status as a major population center, its proximity to Afghanistan, and persistent immunization challenges in specific neighborhoods.</p>
<p>The affected child exhibited acute flaccid paralysis symptoms and was confirmed positive through laboratory analysis. The timing of this case adds to growing concern about the trajectory of cases in 2024 and underscores the need for intensified programme action across Balochistan.</p>
<p>Quetta's unique challenges include large Afghan refugee populations, dense informal settlements with historically low vaccination coverage, and communities that have at times been resistant to vaccination due to social and religious misconceptions. These factors combine to create pockets of susceptibility that allow poliovirus to establish and maintain transmission chains.</p>
<p>The 18th case announcement triggered enhanced emergency vaccination activities in Quetta and surrounding districts. Community mobilizers were deployed specifically to work with Afghan refugee community leaders and families to ensure their children received the vaccine.</p>
<p>Programme officials acknowledged that Quetta requires a specialized approach that goes beyond standard campaign protocols, including sustained social mobilization, reliable mapping of high-risk settlements, and consistent engagement with community gatekeepers throughout the year rather than only during campaign periods.</p>`

  return (
    <PolioInfoPage
      title="18th Polio Case of 2024 Reported from Quetta"
      path="/media-room/media-releases/2517-18th-polio-case-of-2024-reported-from-quetta"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#18" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
