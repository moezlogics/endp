import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "16th Polio Case of 2024 Reported from Hyderabad",
  description: "This press release confirms Pakistan's 16th wild poliovirus type 1 case of 2024, detected in Hyderabad — a major urban center in Sindh province. The confir...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2508-16th-polio-case-of-2024-reported-from-hyderabad",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release confirms Pakistan's 16th wild poliovirus type 1 case of 2024, detected in Hyderabad — a major urban center in Sindh province. The confirmation of a case in a large city like Hyderabad is particularly concerning because urban environments, with their high population density and movement, can facilitate rapid viral spread.</p>
<p>Hyderabad is one of Pakistan's largest cities and serves as a major commercial and transportation hub for Sindh province. The detection of poliovirus here suggests that despite its urban infrastructure, immunity gaps persist in certain neighborhoods, likely corresponding to areas with dense populations of migrants from other provinces.</p>
<p>The affected child had not been adequately vaccinated, raising questions about why previous vaccination campaigns had not reached this particular household. Investigation teams were deployed to understand the circumstances and identify nearby children who may also have been missed.</p>
<p>The Hyderabad case prompted emergency vaccination activities across the city and surrounding districts. Health officials also reviewed microplanning data to identify areas where campaign coverage had been inadequate and to ensure better performance in subsequent rounds.</p>
<p>This case illustrates that polio is not exclusively a rural problem — urban poverty, population movement, and vaccination gaps can sustain poliovirus circulation in even relatively developed city environments. Robust urban immunization strategies remain essential for achieving Pakistan's eradication goals.</p>`

  return (
    <PolioInfoPage
      title="16th Polio Case of 2024 Reported from Hyderabad"
      path="/media-room/media-releases/2508-16th-polio-case-of-2024-reported-from-hyderabad"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#16" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
