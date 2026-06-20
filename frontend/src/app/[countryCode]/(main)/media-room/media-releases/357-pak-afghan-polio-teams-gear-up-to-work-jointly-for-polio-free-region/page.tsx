import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pak-Afghan Polio Teams Gear Up to Work Jointly for Polio-Free Region",
  description: "This press release announces coordinated preparations by Pakistani and Afghan polio programme teams to conduct synchronized cross-border vaccination activi...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/357-pak-afghan-polio-teams-gear-up-to-work-jointly-for-polio-free-region",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces coordinated preparations by Pakistani and Afghan polio programme teams to conduct synchronized cross-border vaccination activities. The joint effort reflects the recognition that as long as poliovirus circulates freely across the Pakistan-Afghanistan border, neither country can achieve its eradication goals independently.</p>
<p>Representatives from Pakistan's NEOC and Afghanistan's National Emergency Operations Centre met to align campaign schedules, share epidemiological data, and coordinate border vaccination post operations. The joint planning ensures that children crossing the border between the two countries are reached by vaccination teams on both sides.</p>
<p>The press release details the specific border crossings, transit routes, and population movement corridors that have been identified as high-priority for synchronized vaccination. These include the Torkham crossing between KP and Nangarhar, the Chaman crossing between Balochistan and Kandahar, and numerous informal crossing points used by nomadic communities.</p>
<p>Cross-border genetic data sharing was also formalized as part of the coordination, allowing both countries to understand the origin of virus strains detected in their respective territories and to plan targeted responses accordingly.</p>
<p>The joint working arrangement represents one of the most pragmatic and successful examples of cross-border health cooperation in South and Central Asia. Global health partners supported the coordination through technical assistance and funding, recognizing that the success of the entire global eradication effort depends on interrupting transmission in this shared endemic zone.</p>`

  return (
    <PolioInfoPage
      title="Pak-Afghan Polio Teams Gear Up to Work Jointly for Polio-Free Region"
      path="/media-room/media-releases/357-pak-afghan-polio-teams-gear-up-to-work-jointly-for-polio-free-region"
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
