import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports 3rd Polio Case of 2025",
  description: "The confirmation of Pakistan's third wild poliovirus case in 2025 represented a continued trajectory of concern in the early months of the year. This press...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2604-pakistan-reports-3rd-polio-case-of-2025",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The confirmation of Pakistan's third wild poliovirus case in 2025 represented a continued trajectory of concern in the early months of the year. This press release reports the case details, including the district of origin and the affected child's vaccination history, while providing an update on the programme's response efforts.</p>
<p>Each early-year case is particularly significant because it establishes the baseline trajectory for the annual case count. Programme strategists use early case data to assess whether the interventions introduced after the 2024 review are having the desired effect and whether additional emergency measures are required.</p>
<p>The third case prompted renewed public health messaging campaigns directed at communities in high-risk districts. Key messages emphasized that even children who had received some vaccine doses might still need additional rounds to achieve full protection, and that parents should never refuse vaccination teams access to their children.</p>
<p>Health officials used this occasion to remind the public that poliovirus can cause permanent paralysis within 24-48 hours of infection, and that there is no cure once the virus has affected the nervous system. Prevention through vaccination is the only protection available.</p>
<p>The press release concludes with a reminder that Pakistan is working toward eradication and that every family's participation in vaccination is essential to achieving this goal. The programme urged all stakeholders — government, civil society, religious leaders, and parents — to remain committed until poliovirus is completely eliminated.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports 3rd Polio Case of 2025"
      path="/media-room/media-releases/2604-pakistan-reports-3rd-polio-case-of-2025"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#3" },
        { label: "Year", value: "2025" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
