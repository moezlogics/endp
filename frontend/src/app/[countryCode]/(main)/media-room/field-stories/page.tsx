import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Eradication Field Stories Pakistan – Frontline Workers, Community Impact & Human Stories | End Polio Pakistan",
  description: "Polio Eradication Field Stories Pakistan – Frontline Workers, Community Impact & Human Stories | End Polio Pakistan — this page provides reference material...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>Polio Eradication Field Stories Pakistan – Frontline Workers, Community Impact & Human Stories | End Polio Pakistan</strong> — this page provides reference material and public health resources relating to the Pakistan Polio Eradication Programme. As part of a coordinated effort to eliminate poliovirus from the region, the programme manages large-scale campaigns, community mobilization, and epidemiological testing.</p>

<h2>Eradication Framework &amp; Public Support</h2>
<p>Pakistan has made immense progress in reducing cases since the launch of the national emergency operations. Achieving a polio-free status requires reaching every child with oral polio vaccine (OPV) drops. We encourage families and community leaders to support frontline workers and utilize public health resources to protect the next generation.</p>`

  return (
    <PolioInfoPage
      title="Polio Eradication Field Stories Pakistan – Frontline Workers, Community Impact & Human Stories | End Polio Pakistan"
      path="/media-room/field-stories"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Polio Eradication Fi..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
