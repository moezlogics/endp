import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "New Polio Case Underscores Ongoing Risk in South Khyber Pakhtunkhwa",
  description: "This press release highlights a newly confirmed polio case in South Khyber Pakhtunkhwa, a region that has been identified as one of the most critical reser...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2649-new-polio-case-underscores-ongoing-risk-in-south-khyber-pakhtunkhwa",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release highlights a newly confirmed polio case in South Khyber Pakhtunkhwa, a region that has been identified as one of the most critical reservoirs of wild poliovirus in Pakistan. The case further underscores the persistent transmission risk in this part of the country, where multiple districts have recorded cases in consecutive years.</p>
<p>South KP, comprising districts such as Tank, Dera Ismail Khan, Bannu, Lakki Marwat, and North and South Waziristan, faces a unique set of challenges. These include conflict-affected populations, security restrictions on vaccination access, high population mobility, and communities where vaccine hesitancy has historically been strong.</p>
<p>The newly confirmed child had not received adequate vaccination protection, highlighting once again the critical importance of reaching every child in every round. Health officials noted that even a single missed campaign can leave a child vulnerable, and that cumulative missed doses create the immunity gaps that allow the virus to persist.</p>
<p>In response to this case, emergency vaccination activities were launched in the affected district and adjacent areas. Security forces were briefed to facilitate access for health teams. Community leaders, including religious scholars and tribal elders, were engaged to support the response.</p>
<p>The South KP case is a strong reminder that eradication cannot be declared anywhere in Pakistan until transmission is completely interrupted in these high-risk southern districts, where the virus has proven most difficult to eliminate.</p>`

  return (
    <PolioInfoPage
      title="New Polio Case Underscores Ongoing Risk in South Khyber Pakhtunkhwa"
      path="/media-room/media-releases/2649-new-polio-case-underscores-ongoing-risk-in-south-khyber-pakhtunkhwa"
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
