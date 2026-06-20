import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "WPV1 Found in Sewage Samples of Attock and South Waziristan Lower",
  description: "This press release reports the detection of wild poliovirus type 1 in sewage samples collected from Attock district in Punjab province and South Waziristan...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2511-wpv1-found-in-sewage-samples-of-attock-and-south-waziristan-lower",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release reports the detection of wild poliovirus type 1 in sewage samples collected from Attock district in Punjab province and South Waziristan Lower in Khyber Pakhtunkhwa. The positive environmental samples are a warning signal that poliovirus is actively circulating in both locations, even if no clinical paralysis cases have yet been confirmed.</p>
<p>The detection in Attock is particularly notable because Punjab is generally considered a lower-risk province compared to KP and Balochistan. Attock's geographic position bordering KP makes it vulnerable to viral introduction from higher-prevalence areas through population movement.</p>
<p>South Waziristan Lower has been one of the most consistently challenging districts for the polio programme due to ongoing security concerns, community resistance to vaccination in some areas, and high population mobility. Environmental positivity here is not surprising but remains deeply concerning.</p>
<p>The environmental findings triggered immediate response actions including emergency vaccination campaigns in both districts and intensified environmental sampling from additional sites to better define the geographic scope of circulation.</p>
<p>Programme officials emphasized that environmental surveillance is designed precisely to catch these situations before they lead to paralysis in children. The proactive response enabled by early detection of virus in sewage samples can prevent unnecessary cases of permanent disability.</p>
<p>Both districts were placed on heightened surveillance alert, and district health managers were directed to urgently review and strengthen vaccination coverage in areas where the virus was detected.</p>`

  return (
    <PolioInfoPage
      title="WPV1 Found in Sewage Samples of Attock and South Waziristan Lower"
      path="/media-room/media-releases/2511-wpv1-found-in-sewage-samples-of-attock-and-south-waziristan-lower"
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
