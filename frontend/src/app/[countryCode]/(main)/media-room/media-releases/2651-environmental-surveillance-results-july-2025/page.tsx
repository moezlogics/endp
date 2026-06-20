import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Environmental Surveillance Results – July 2025",
  description: "This press release presents the findings from Pakistan's environmental surveillance network for the month of July 2025. Environmental surveillance involves...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2651-environmental-surveillance-results-july-2025",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release presents the findings from Pakistan's environmental surveillance network for the month of July 2025. Environmental surveillance involves the collection and testing of sewage and wastewater samples from designated sites across the country to detect the presence of poliovirus, even in the absence of clinical cases.</p>
<p>The results indicate which districts and cities tested positive for poliovirus in sewage samples during the reporting period. Environmental surveillance is a crucial tool because poliovirus can circulate silently in a community for weeks before causing paralysis, allowing authorities to identify hotspots and respond proactively.</p>
<p>Samples were collected from a network of over 80 districts, covering densely populated urban centres as well as high-risk border areas. The findings from July 2025 informed the planning of subsequent vaccination campaigns and helped target resources efficiently.</p>
<p>Pakistan has one of the most extensive environmental surveillance systems in the world, developed and maintained with the support of international partners including WHO and UNICEF. Regular publication of these results demonstrates the programme's commitment to transparency.</p>
<p>Health officials use this data alongside clinical case surveillance to build a comprehensive picture of poliovirus circulation. The July 2025 results are an important reference point for programme managers and global partners monitoring Pakistan's eradication progress.</p>`

  return (
    <PolioInfoPage
      title="Environmental Surveillance Results – July 2025"
      path="/media-room/media-releases/2651-environmental-surveillance-results-july-2025"
      contentHtml={content}
      metrics={[
        { label: "Surveillance Type", value: "Sewage Sampling" },
        { label: "Year", value: "2025" },
        { label: "Testing Lab", value: "NIH Islamabad" },
        { label: "Alert Level", value: "Active Monitoring" }
      ]}
    />
  )
}
