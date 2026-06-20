import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update – July 2017",
  description: "The Pakistan Polio Update for July 2017 captures the programme during what would prove to be a historic year. With Pakistan on course to record only eight...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/pakistan-polio-update-july-2017.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Update for July 2017 captures the programme during what would prove to be a historic year. With Pakistan on course to record only eight wild poliovirus cases for the entire year — a record low — the July 2017 briefer reflects cautious optimism and continued operational intensity.</p>
<p>July 2017 falls in the heart of Pakistan's summer season, a period of high-intensity vaccination activity designed to maintain immunity levels before the cooler months when transmission typically increases. The briefer documents campaign rounds conducted during the month, their geographic coverage, and performance against planned targets.</p>
<p>Environmental surveillance data for July 2017 is particularly important contextually. Despite the very low clinical case count for the year, poliovirus continued to be detected in sewage samples in parts of KP and Balochistan, indicating that the virus was still circulating below the threshold of causing widespread paralysis. This environmental positivity was a warning sign that the programmatic gains could be fragile.</p>
<p>The July briefer also includes updates on community engagement activities, cross-border coordination with Afghanistan, and accountability processes. Programme managers were urged to sustain the intensity of operations and not allow complacency to creep in during a period of apparent success.</p>
<p>The July 2017 briefer is an important historical document capturing a high point in Pakistan's recent eradication history and the cautious, data-driven approach that produced it.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update – July 2017"
      path="/images/polio-briefer/pakistan-polio-update-july-2017-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2017" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
