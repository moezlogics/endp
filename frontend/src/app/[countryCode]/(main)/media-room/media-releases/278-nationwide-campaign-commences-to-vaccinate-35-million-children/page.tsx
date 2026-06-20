import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Nationwide Campaign Commences to Vaccinate 35 Million Children",
  description: "This press release announces the launch of a massive nationwide polio vaccination campaign targeting 35 million children under five years of age across all...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/278-nationwide-campaign-commences-to-vaccinate-35-million-children",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces the launch of a massive nationwide polio vaccination campaign targeting 35 million children under five years of age across all administrative units of Pakistan. The commencement of this campaign represents a major logistical mobilization involving hundreds of thousands of vaccinators, supervisors, and support staff deployed simultaneously across the country.</p>
<p>Preparations for the campaign included detailed microplanning at the union council level, ensuring that every household is mapped and assigned to a vaccination team. Vaccine supplies were pre-positioned at district and tehsil level cold chain facilities, and training was conducted for all field staff in the days prior to the launch.</p>
<p>The campaign runs for several days, with make-up days at the end to capture children who were absent or missed during the main campaign days. Permanent transit vaccination posts at bus stations, railway stations, and major road checkpoints capture children in movement between districts.</p>
<p>High-level political support for the launch included federal and provincial ministers, district commissioners, and religious leaders participating in inauguration ceremonies across the country. This visible political ownership sends a message to communities that vaccination is a national priority.</p>
<p>The target of 35 million children reflects the enormous scale of Pakistan's child population and the comprehensive ambition of the eradication effort. Each child reached brings Pakistan closer to the day when no child will suffer the permanent paralysis caused by this ancient, preventable disease.</p>`

  return (
    <PolioInfoPage
      title="Nationwide Campaign Commences to Vaccinate 35 Million Children"
      path="/media-room/media-releases/278-nationwide-campaign-commences-to-vaccinate-35-million-children"
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
