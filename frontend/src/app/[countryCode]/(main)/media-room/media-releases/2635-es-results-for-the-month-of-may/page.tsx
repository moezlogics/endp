import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Environmental Surveillance Results for the Month of May",
  description: "This press release presents the environmental surveillance findings for the month of May from Pakistan's nationwide wastewater testing network. May is a cr...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2635-es-results-for-the-month-of-may",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release presents the environmental surveillance findings for the month of May from Pakistan's nationwide wastewater testing network. May is a critical month in the polio calendar, falling within the pre-monsoon period when increased human movement and changes in sanitation conditions can influence poliovirus transmission patterns.</p>
<p>The May results report which districts and cities had positive environmental samples, indicating active poliovirus circulation in sewage. The geographic distribution of positive sites informs the targeting of upcoming summer vaccination campaigns and helps programme managers understand whether transmission is spreading, contracting, or remaining stable.</p>
<p>For the month of May, samples were collected from the full network of environmental surveillance sites covering densely populated urban centers, high-risk districts, and border areas. Laboratory results are typically available within a few weeks of sample collection, enabling rapid programmatic response.</p>
<p>The May environmental results are shared simultaneously with the NEOC, provincial governments, district health officers, and international partners to enable coordinated response actions. Areas with positive samples in May receive priority attention in June campaign planning.</p>
<p>This press release is part of the programme's commitment to monthly public reporting of environmental surveillance findings. Regular publication builds public confidence in the transparency of the monitoring system and ensures that decision-making at all levels is based on the most current available data. The May results contribute to the longer-term epidemiological picture of poliovirus circulation in Pakistan.</p>`

  return (
    <PolioInfoPage
      title="Environmental Surveillance Results for the Month of May"
      path="/media-room/media-releases/2635-es-results-for-the-month-of-may"
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
