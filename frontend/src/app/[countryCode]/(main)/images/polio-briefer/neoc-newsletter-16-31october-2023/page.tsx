import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "NEOC Newsletter – October 2023 (16–31)",
  description: "NEOC Newsletter – October 2023 (16–31) — this operational briefing document provides a concise update on the polio eradication programme's activities, epid...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/NEOC-Newsletter-(16-31)October-2023",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>NEOC Newsletter – October 2023 (16–31)</strong> — this operational briefing document provides a concise update on the polio eradication programme's activities, epidemiology, and campaign highlights. Published by the NEOC, the briefer is designed to give donors, health partners, and the public a regular overview of program performance.</p>

<h2>Epidemiology &amp; Field Updates</h2>
<p>The briefer summarizes recent environmental detections, confirmed cases of paralysis, and results of synchronized immunization rounds. By using charts and regional maps, it highlights transmission trends and tracks progress toward zero-polio targets across the national and provincial emergency operation centers.</p>`

  return (
    <PolioInfoPage
      title="NEOC Newsletter – October 2023 (16–31)"
      path="/images/polio-briefer/neoc-newsletter-16-31october-2023"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2023" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
