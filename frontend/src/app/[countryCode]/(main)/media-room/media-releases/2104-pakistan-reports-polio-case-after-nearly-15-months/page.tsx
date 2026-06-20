import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Reports Polio Case After Nearly 15 Months",
  description: "This press release carries the sobering news that Pakistan has confirmed a new wild poliovirus case after a gap of nearly 15 months without any confirmed c...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2104-pakistan-reports-polio-case-after-nearly-15-months",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release carries the sobering news that Pakistan has confirmed a new wild poliovirus case after a gap of nearly 15 months without any confirmed cases — a period that had raised hopes that the country might be on the verge of interrupting transmission. The end of this case-free period was a significant setback and a reminder of the virus's persistence.</p>
<p>The 15-month gap had been the longest period without a clinical case in Pakistan's recent history and had generated cautious optimism both nationally and within the global health community. Programme officials, while encouraged, had consistently warned that environmental surveillance continued to detect the virus in sewage samples, indicating that silent circulation had not stopped.</p>
<p>The new case confirms the worst fears: that the immunity levels built through intensive vaccination over the preceding months had not been sufficient to fully interrupt transmission chains, and that poliovirus had been waiting for an opportunity to resurface in a susceptible child.</p>
<p>The press release details the immediate response: emergency vaccination campaigns in the affected district and neighboring areas, intensified surveillance, and a comprehensive review of programme performance to understand what had allowed virus circulation to continue during the case-free period.</p>
<p>The case after 15 months remains one of the more studied events in Pakistan's eradication history, offering important lessons about the gap between case-free status and true interruption of transmission.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Reports Polio Case After Nearly 15 Months"
      path="/media-room/media-releases/2104-pakistan-reports-polio-case-after-nearly-15-months"
      contentHtml={content}
      metrics={[
        { label: "Case Number", value: "Confirmed" },
        { label: "Year", value: "recent" },
        { label: "Virus Type", value: "WPV1" },
        { label: "Response", value: "Outbreak Protocol" }
      ]}
    />
  )
}
