import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Community Influencers Dispel Myths About Polio Drops in Punjab",
  description: "This field story documents the successful use of community influencers to address and dispel vaccine myths in Punjab province, Pakistan's most populous reg...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/12-field-stories/126-community-influencers-dispel-myths-about-polio-drops-in-punjab",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story documents the successful use of community influencers to address and dispel vaccine myths in Punjab province, Pakistan's most populous region. While Punjab has historically recorded fewer polio cases than KP and Balochistan, pockets of vaccine hesitancy remain in certain districts and urban neighborhoods.</p>
<p>The story follows a network of trusted community members — including religious leaders, local teachers, women's group organizers, and health champions — who were trained and supported to speak with families about the safety and importance of polio vaccination. Their credibility within their communities gave their messages far greater influence than those delivered by outside health workers or government officials.</p>
<p>Common myths addressed included claims that the vaccine causes infertility, contains haram substances, is a Western conspiracy, or has harmful side effects. Each of these falsehoods was refuted using a combination of religious evidence, scientific data, and personal testimonials from parents whose children had been safely vaccinated.</p>
<p>The community influencer approach proved particularly effective in reaching households that had previously refused vaccination teams. When a trusted neighbor or religious figure personally advocates for vaccination, resistance often softens in ways that formal health messaging cannot achieve.</p>
<p>The Punjab experience offers valuable lessons for community engagement strategies nationwide, demonstrating that sustainable changes in vaccination behavior require investing in trusted messengers who live and work within the communities they serve.</p>`

  return (
    <PolioInfoPage
      title="Community Influencers Dispel Myths About Polio Drops in Punjab"
      path="/12-field-stories/126-community-influencers-dispel-myths-about-polio-drops-in-punjab"
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
