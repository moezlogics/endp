import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Eradication Online Resources Pakistan – Research Papers, Educational Tools & Technical References | End Polio Pakistan Knowledge Centre",
  description: "Polio Eradication Online Resources Pakistan – Research Papers, Educational Tools & Technical References | End Polio Pakistan Knowledge Centre — this page p...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/knowledge-centre/online-resource",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>Polio Eradication Online Resources Pakistan – Research Papers, Educational Tools & Technical References | End Polio Pakistan Knowledge Centre</strong> — this page provides reference material and public health resources relating to the Pakistan Polio Eradication Programme. As part of a coordinated effort to eliminate poliovirus from the region, the programme manages large-scale campaigns, community mobilization, and epidemiological testing.</p>

<h2>Eradication Framework &amp; Public Support</h2>
<p>Pakistan has made immense progress in reducing cases since the launch of the national emergency operations. Achieving a polio-free status requires reaching every child with oral polio vaccine (OPV) drops. We encourage families and community leaders to support frontline workers and utilize public health resources to protect the next generation.</p>`

  return (
    <PolioInfoPage
      title="Polio Eradication Online Resources Pakistan – Research Papers, Educational Tools & Technical References | End Polio Pakistan Knowledge Centre"
      path="/knowledge-centre/online-resource"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Polio Eradication On..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
