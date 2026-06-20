import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Poliovirus Detected from Sewage in 8 Cities of Pakistan During December",
  description: "This press release reports the detection of poliovirus in sewage samples collected from eight major cities across Pakistan during the month of December. Th...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/569-poliovirus-detected-from-sewage-in-8-cities-of-pakistan-during-december",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release reports the detection of poliovirus in sewage samples collected from eight major cities across Pakistan during the month of December. The positive environmental results indicate that poliovirus is circulating silently in multiple urban centers, even in cities that have not recently reported clinical paralysis cases.</p>
<p>The eight cities with positive environmental results include a mix of large metropolitan areas and secondary cities across multiple provinces. The geographic spread of positive samples reflects the ability of poliovirus to move through human populations via the fecal-oral transmission route, with urban sewage systems providing a reliable detection mechanism.</p>
<p>Environmental surveillance data from December is particularly important because it informs the planning of early January vaccination campaigns. By knowing precisely which cities had active viral circulation at the end of the year, the programme can prioritize those areas for the first immunization activities of the new year.</p>
<p>The press release explains the environmental surveillance methodology, including sample collection protocols, laboratory testing procedures, and the timeline from sample collection to result publication. This transparency helps build public understanding of how the programme monitors viral circulation.</p>
<p>Health officials announce that responsive vaccination activities will be launched in all eight cities with positive results and that environmental sampling will be intensified in those areas. The findings are also shared with provincial health departments and district management for action planning.</p>`

  return (
    <PolioInfoPage
      title="Poliovirus Detected from Sewage in 8 Cities of Pakistan During December"
      path="/media-room/media-releases/569-poliovirus-detected-from-sewage-in-8-cities-of-pakistan-during-december"
      contentHtml={content}
      metrics={[
        { label: "Surveillance Type", value: "Sewage Sampling" },
        { label: "Year", value: "2024" },
        { label: "Testing Lab", value: "NIH Islamabad" },
        { label: "Alert Level", value: "Active Monitoring" }
      ]}
    />
  )
}
