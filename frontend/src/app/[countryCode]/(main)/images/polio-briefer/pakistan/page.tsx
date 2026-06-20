import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Briefer (Incomplete URL)",
  description: "The Pakistan Polio Briefer series is a collection of monthly and periodic documents that summarize the state of polio eradication in Pakistan at any given...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Pakistan Polio Briefer series is a collection of monthly and periodic documents that summarize the state of polio eradication in Pakistan at any given point in time. These briefers are produced by the National Emergency Operations Centre and distributed to government officials, international partners, donors, and technical teams involved in the programme.</p>
<p>Each briefer typically includes the current count of confirmed wild poliovirus and vaccine-derived poliovirus cases, a map showing the geographic distribution of cases and positive environmental surveillance sites, and key performance data from recent vaccination campaigns.</p>
<p>The briefers also highlight programmatic developments such as new campaign launches, policy changes, international visits, and communication milestones. They serve as concise, visually accessible summaries of information that is otherwise spread across multiple technical documents.</p>
<p>For donors and international partners, the briefers provide confidence that their investments are being tracked and reported transparently. For programme staff, they serve as a regular check on progress against targets.</p>
<p>The incomplete URL for this particular briefer suggests it may have been a placeholder or an error in the original link. However, the broader briefer series remains one of the most important knowledge products produced by the Pakistan Polio Eradication Programme, and all available editions can be accessed through the media room and knowledge centre sections of the End Polio Pakistan website.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Briefer (Incomplete URL)"
      path="/images/polio-briefer/pakistan"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "Recent" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
