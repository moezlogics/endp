import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Weekly Environmental Sampling Results – 7",
  description: "This media release presents the seventh installment of weekly environmental sampling results from Pakistan's nationwide poliovirus surveillance network. En...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2622-weekly-environmental-sampling-results-7",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This media release presents the seventh installment of weekly environmental sampling results from Pakistan's nationwide poliovirus surveillance network. Environmental surveillance is a cornerstone of Pakistan's detection strategy, allowing health authorities to identify the presence of poliovirus in communities before clinical cases of paralysis appear.</p>
<p>Sewage and wastewater samples collected from designated sites across dozens of districts were analyzed at certified laboratories. The results indicate which locations tested positive for poliovirus, enabling programme managers to identify areas of active circulation and prioritize them for immediate vaccination response.</p>
<p>Weekly reporting of environmental results reflects an enhanced surveillance approach adopted in response to previous outbreaks. More frequent testing allows faster identification of new transmission sites and accelerates the programme's response time, which is critical in stopping the spread of the virus.</p>
<p>The results also contribute to the global poliovirus database, allowing scientists to track viral movement across countries and continents. This data helps researchers understand how the virus evolves and supports the development of more effective eradication strategies.</p>
<p>Positive environmental samples in districts with recent high campaign coverage are particularly concerning and trigger review of vaccination quality in those areas. This report is therefore not just a surveillance document — it is a management tool that drives programmatic action to protect children across Pakistan.</p>`

  return (
    <PolioInfoPage
      title="Weekly Environmental Sampling Results – 7"
      path="/media-room/media-releases/2622-weekly-environmental-sampling-results-7"
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
