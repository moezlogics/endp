import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Special Polio Campaign Concludes With More Than 7.1 Million Children Vaccinated",
  description: "This press release celebrates the successful conclusion of a special targeted polio immunization campaign that vaccinated more than 7.1 million children ac...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/1519-special-polio-campaign-concludes-with-more-than-7-1-million-children-vaccinated",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release celebrates the successful conclusion of a special targeted polio immunization campaign that vaccinated more than 7.1 million children across priority districts in Pakistan. The campaign was designed as a rapid response to address immunity gaps identified through recent case detections and environmental surveillance findings.</p>
<p>Special campaigns differ from national campaigns in their geographic focus. Rather than covering all districts simultaneously, they concentrate resources on specific high-risk areas where vaccination coverage has been low, poliovirus has been detected in environmental samples, or recent cases have been confirmed. This targeted approach allows for greater intensity and follow-up in problem areas.</p>
<p>Over the campaign days, teams of two or three vaccinators visited every household in targeted areas, ensuring that each child under five received oral polio vaccine drops. Transit teams were deployed at bus stations, railway platforms, and border crossings to vaccinate children in transit who might otherwise be missed.</p>
<p>The 7.1 million figure represents the scale of the effort and the number of children who received protection against poliovirus during this specific operation. Programme officials praised the performance of vaccination teams, supervisors, and district health management for achieving high coverage.</p>
<p>The successful conclusion of this campaign was seen as an important step in reducing immunity gaps in high-risk areas, though officials cautioned that sustained effort across multiple campaign rounds would be needed to fully interrupt transmission in all affected districts.</p>`

  return (
    <PolioInfoPage
      title="Special Polio Campaign Concludes With More Than 7.1 Million Children Vaccinated"
      path="/media-room/media-releases/1519-special-polio-campaign-concludes-with-more-than-7-1-million-children-vaccinated"
      contentHtml={content}
      metrics={[
        { label: "Campaign Focus", value: "National Round" },
        { label: "Target Scope", value: "Under-5 Children" },
        { label: "Year", value: "2024" },
        { label: "Status", value: "Concluded" }
      ]}
    />
  )
}
