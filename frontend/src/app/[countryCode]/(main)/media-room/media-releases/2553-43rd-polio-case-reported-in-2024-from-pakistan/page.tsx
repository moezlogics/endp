import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "43rd Polio Case Reported in 2024 from Pakistan",
  description: "The confirmation of Pakistan's 43rd wild poliovirus case of 2024 marks a deeply troubling milestone that reflects the scale of the transmission challenge t...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2553-43rd-polio-case-reported-in-2024-from-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The confirmation of Pakistan's 43rd wild poliovirus case of 2024 marks a deeply troubling milestone that reflects the scale of the transmission challenge the country faces. This press release details the case background, geographic location, and programmatic response, while providing context for the broader trajectory of cases throughout the year.</p>
<p>By the time the 43rd case was confirmed, it had become clear that 2024 would represent a significant setback compared to 2023, when only six cases were recorded. The jump in cases prompted serious programmatic review and emergency mobilization of additional resources.</p>
<p>Programme analysts noted that the cases were geographically concentrated in specific high-risk corridors, particularly in Khyber Pakhtunkhwa and Balochistan. The virus strains detected were genetically linked to strains circulating in Afghanistan, confirming the transboundary nature of the transmission.</p>
<p>In response to the mounting case count, the National Emergency Operations Centre convened emergency review meetings with provincial governments and international partners. Enhanced campaign rounds were scheduled for high-risk districts, with a focus on improving door-to-door coverage and reaching previously missed children.</p>
<p>The 43rd case serves as a stark reminder of what is at stake. Each case represents a child who will carry the burden of paralysis for their entire life. The press release concludes with renewed calls for community cooperation, parental responsibility, and government accountability in the fight against this preventable disease.</p>`

  return (
    <PolioInfoPage
      title="43rd Polio Case Reported in 2024 from Pakistan"
      path="/media-room/media-releases/2553-43rd-polio-case-reported-in-2024-from-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "#43" },
        { label: "Year", value: "2024" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
