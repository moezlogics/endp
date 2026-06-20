import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Status as on March 2019",
  description: "In March 2019, the Pakistan Polio Eradication Programme faced a highly challenging environment. Despite massive countrywide efforts, the poliovirus continu...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/March-2019-Polio-Update.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>In March 2019, the Pakistan Polio Eradication Programme faced a highly challenging environment. Despite massive countrywide efforts, the poliovirus continued to persist in specific geographical pockets, highlighting the urgent need for a sharper, more aggressive approach to save the country's children from lifelong disability.</p>
<p>1. The Polio Case Count By March 2019, Pakistan had officially reported a rising number of Wild Poliovirus (WPV1) cases compared to previous record lows. The virus was heavily concentrated in specific core reservoirs, including:</p>
<p>Khyber Pakhtunkhwa (KP) – particularly the southern districts and newly merged tribal districts.</p>
<p>Karachi – continuing to serve as a major urban hub for virus transmission.</p>
<p>The Quetta Block – in Balochistan, where cross-border population movement played a huge role.</p>
<p>2. Main Challenges Faced by the Programme The update identified three major hurdles that were stopping Pakistan from reaching zero polio cases:</p>
<p>High Parental Refusals: An alarming increase in fake news, social media propaganda, and local rumors caused many parents to actively turn away vaccination teams.</p>
<p>Missed Children: Mobile populations, transit families, and children living in insecure or hard-to-reach areas were frequently missed during regular campaigns.</p>
<p>Environmental Tracking: Poliovirus was regularly being detected in sewage water samples (environmental surveillance) across major cities, meaning the virus was silently moving through communities even where no human paralysis cases were showing up yet.</p>
<p>3. Immediate Actions & Next Steps To counter these threats, the National Emergency Operations Centre (NEOC) shifted its focus toward the following tactics:</p>
<p>Aggressive Nationwide Campaigns: Deploying more than 260,000 frontline workers to vaccinate over 39 million children under the age of five during the Spring rounds.</p>
<p>Fighting Propaganda: Launching strong media and community-level communication strategies to clear up misconceptions and rebuild trust in the vaccine's safety.</p>
<p>Transit Strategy: Placing special vaccination teams at permanent transit points (toll plazas, bus stations, and borders) to vaccinate children on the move.</p>
<p>The Bottom Line: The March 2019 update was a serious wake-up call. It proved that while Pakistan had the infrastructure to end polio, defeating the virus completely required overcoming community hesitation and stopping the spread of false rumors.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Status as on March 2019"
      path="/images/polio-briefer/march-2019-polio-update-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2019" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
