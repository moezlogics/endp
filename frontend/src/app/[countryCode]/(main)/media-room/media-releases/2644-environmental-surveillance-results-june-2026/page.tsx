import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Environmental Surveillance Results – June 2026",
  description: "The Environmental Surveillance Results for June 2026 provide the latest findings from Pakistan's extensive wastewater testing network, one of the most soph...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2644-environmental-surveillance-results-june-2026",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Environmental Surveillance Results for June 2026 provide the latest findings from Pakistan's extensive wastewater testing network, one of the most sophisticated environmental poliovirus detection systems in the world. These results are critical for understanding where poliovirus is actively circulating, even in the absence of confirmed clinical paralysis cases.</p>
<p>During June 2026, samples were collected from sites across dozens of districts in all four provinces. Laboratories analyzed these samples for the presence of wild poliovirus and vaccine-derived poliovirus strains. Positive results trigger immediate programmatic responses including targeted emergency vaccination campaigns in affected areas.</p>
<p>The June 2026 results come at a time when Pakistan continues to work toward interrupting poliovirus transmission. The data provides programme managers with a real-time map of viral circulation, enabling evidence-based decisions about where to focus resources in the coming weeks.</p>
<p>Environmental surveillance is particularly valuable because it detects the virus in sewage before children show symptoms of paralysis. This early warning system allows the programme to respond proactively rather than reactively, potentially preventing new paralysis cases through rapid vaccination.</p>
<p>The publication of monthly environmental surveillance results reflects the programme's commitment to data transparency. This information is shared with global polio partners and contributes to the international scientific community's understanding of poliovirus epidemiology in one of the world's most complex remaining endemic settings.</p>`

  return (
    <PolioInfoPage
      title="Environmental Surveillance Results – June 2026"
      path="/media-room/media-releases/2644-environmental-surveillance-results-june-2026"
      contentHtml={content}
      metrics={[
        { label: "Surveillance Type", value: "Sewage Sampling" },
        { label: "Year", value: "2026" },
        { label: "Testing Lab", value: "NIH Islamabad" },
        { label: "Alert Level", value: "Active Monitoring" }
      ]}
    />
  )
}
