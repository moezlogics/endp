import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Eradication Within Reach in Pakistan",
  description: "This field story was written during a period of genuine optimism about Pakistan's prospects for ending polio, capturing the sense that after years of strug...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/12-field-stories/265-eradication-within-reach-in-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story was written during a period of genuine optimism about Pakistan's prospects for ending polio, capturing the sense that after years of struggle, the goal of eradication was genuinely within reach. It celebrates the progress made while honestly acknowledging the challenges that remained.</p>
<p>The story profiles communities that had gone from being hotspots of vaccine resistance to areas with high vaccination acceptance and no recent cases. These transformations, achieved through sustained community engagement, trusted messengers, and consistent campaign quality, demonstrate that change is possible even in the most challenging environments.</p>
<p>Interviews with parents, community leaders, health workers, and programme managers reveal the factors that contributed to progress: stronger political commitment, better-trained vaccination teams, more credible community mobilizers, and the tangible evidence of polio's consequences visible in affected families who became advocates for vaccination.</p>
<p>The field story also captures the atmosphere of cautious determination at the programme's leadership level. Officials are clear-eyed about the work that remains — particularly in the tribal areas and border districts where the virus is most tenacious — but increasingly confident that the tools, strategies, and partnerships needed for final success are in place.</p>
<p>"Eradication Within Reach" remains an important document in the programme's history, capturing both the hope and the warnings of a period that would be followed by a significant resurgence. It serves as a reminder that eradication requires relentless vigilance right until the very last case.</p>`

  return (
    <PolioInfoPage
      title="Eradication Within Reach in Pakistan"
      path="/12-field-stories/265-eradication-within-reach-in-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus Area", value: "Community Reach" },
        { label: "Role", value: "Frontline Mobilizer" },
        { label: "Status", value: "Field Report" }
      ]}
    />
  )
}
