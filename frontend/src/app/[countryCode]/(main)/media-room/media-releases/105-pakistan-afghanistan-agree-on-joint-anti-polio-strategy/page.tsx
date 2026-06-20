import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan, Afghanistan Agree on Joint Anti-Polio Strategy",
  description: "This media release announces a landmark bilateral agreement between Pakistan and Afghanistan to coordinate their polio eradication strategies. The two coun...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/105-pakistan-afghanistan-agree-on-joint-anti-polio-strategy",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This media release announces a landmark bilateral agreement between Pakistan and Afghanistan to coordinate their polio eradication strategies. The two countries, which share the world's only remaining reservoir of wild poliovirus, recognized that eliminating polio requires joint action across their shared border.</p>
<p>The agreement outlines a framework for synchronized vaccination campaigns, information sharing, joint supervision of border vaccination posts, and coordinated responses to outbreaks detected in border districts. By aligning their immunization schedules, both countries can prevent children moving across the border from being missed or double-counted.</p>
<p>The joint strategy acknowledges that the poliovirus does not respect national boundaries. Genomic sequencing has repeatedly shown that viral strains circulate freely between Pakistan and Afghanistan, making it impossible for either country to achieve eradication independently.</p>
<p>Under the agreement, Pakistan and Afghanistan established joint technical working groups to oversee cross-border operations. Regular meetings between national coordinators were scheduled to review performance data and resolve operational challenges.</p>
<p>This cooperation represents a critical milestone in the regional eradication effort. International partners, including WHO and UNICEF, facilitated the negotiations and expressed strong support for the joint approach.</p>
<p>The Pakistan-Afghanistan joint anti-polio strategy is considered one of the most important diplomatic achievements in the global fight against poliovirus, recognizing that shared challenges require shared solutions.</p>`

  return (
    <PolioInfoPage
      title="Pakistan, Afghanistan Agree on Joint Anti-Polio Strategy"
      path="/media-room/media-releases/105-pakistan-afghanistan-agree-on-joint-anti-polio-strategy"
      contentHtml={content}
      metrics={[
        { label: "Partnership", value: "Pak-Afghan Joint" },
        { label: "Key Crossings", value: "Torkham & Chaman" },
        { label: "OPV Scope", value: "All Border Crossers" },
        { label: "Target Group", value: "Mobile Populations" }
      ]}
    />
  )
}
