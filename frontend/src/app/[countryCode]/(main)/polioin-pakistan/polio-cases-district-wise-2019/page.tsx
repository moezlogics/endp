import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Cases District Wise 2019",
  description: "This section provides a district-wise breakdown of polio cases in Pakistan for the year 2019. It details the number of reported polio cases in various dist...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/polio-cases-district-wise-2019",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This section provides a district-wise breakdown of polio cases in Pakistan for the year 2019. It details the number of reported polio cases in various districts across the country, highlighting the geographical distribution of the virus during that period.</p>

<h2>Key Information</h2>
<p>District-Wise Data: The page lists polio cases by district, allowing stakeholders to identify specific areas most affected by the virus.</p>
<p>2019 Statistics: The data pertains to the year 2019, providing historical context for polio eradication efforts in Pakistan.</p>
<p>Public Health Significance: Understanding the distribution of polio cases is crucial for targeted interventions, resource allocation, and monitoring progress toward polio eradication.</p>
<p>This information is valuable for public health officials, researchers, and organizations working on polio eradication initiatives in Pakistan, as it helps identify high-risk areas and tailor strategies to specific regional needs.</p>`

  return (
    <PolioInfoPage
      title="Polio Cases District Wise 2019"
      path="/polioin-pakistan/polio-cases-district-wise-2019"
      contentHtml={content}
      metrics={[
        { label: "Programme", value: "Polio Eradication" },
        { label: "Coordinator", value: "NEOC Pakistan" },
        { label: "Coverage", value: "Nationwide" },
        { label: "Helpline", value: "1166" }
      ]}
    />
  )
}
