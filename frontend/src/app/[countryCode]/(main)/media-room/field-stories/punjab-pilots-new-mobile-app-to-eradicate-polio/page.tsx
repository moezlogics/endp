import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Punjab Polio Campaign Mobile App – Digital Innovation to Improve Vaccination Coverage & Real-Time Tracking | End Polio Pakistan",
  description: "Punjab Polio Campaign Mobile App – Digital Innovation to Improve Vaccination Coverage & Real-Time Tracking | End Polio Pakistan — this field story highligh...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/punjab-pilots-new-mobile-app-to-eradicate-polio",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>Punjab Polio Campaign Mobile App – Digital Innovation to Improve Vaccination Coverage & Real-Time Tracking | End Polio Pakistan</strong> — this field story highlights the human dimension of the frontline eradication effort. The story focuses on the dedication of vaccinators and community supervisors who work under challenging conditions to vaccinate children.</p>

<h2>Frontline Action &amp; Regional Challenges</h2>
<p>Frontline workers travel house-to-house to ensure no child is missed. In regions in Punjab, workers cross difficult terrains, walking long distances in extreme weather to deliver oral polio vaccine drops directly to children at their doorsteps.</p>
<p>The community in Punjab has seen active mobilization to resolve vaccine concerns. Frontline workers, mostly local women, play a crucial role in addressing parent concerns through culturally-sensitive communication, transforming hesitant households into supporters of the programme.</p>`

  return (
    <PolioInfoPage
      title="Punjab Polio Campaign Mobile App – Digital Innovation to Improve Vaccination Coverage & Real-Time Tracking | End Polio Pakistan"
      path="/media-room/field-stories/punjab-pilots-new-mobile-app-to-eradicate-polio"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus Area", value: "Punjab" },
        { label: "Role", value: "Frontline Mobilizer" },
        { label: "Status", value: "Field Report" }
      ]}
    />
  )
}
