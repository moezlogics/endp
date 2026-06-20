import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Vaccine Heroes Protect Every Child",
  description: "This field story pays tribute to the vaccine heroes of Pakistan — the hundreds of thousands of frontline workers who conduct polio vaccination campaigns.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/vaccine-heroes-protect-every-child",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story pays tribute to the vaccine heroes of Pakistan — the hundreds of thousands of frontline workers who conduct polio vaccination campaigns across one of the most geographically and socially diverse countries in the world. These individuals are the human engine of Pakistan's eradication effort, and their dedication makes the difference between a child protected and a child paralyzed.</p>

<h2>Frontline Challenges & Community Action</h2>
<p>The story profiles vaccinators from different regions of Pakistan — a young woman working in Karachi's urban slums, a male vaccinator navigating mountain paths in KP, a community health worker building trust in a resistant Balochistan village. Each account reveals the specific challenges of their environment and the creativity and persistence required to overcome them.</p>
<p>Vaccine heroes face not just physical challenges but social and emotional ones: the grief of meeting a paralyzed child who was not vaccinated in time, the frustration of a door slammed in their face, and the joy of a parent who initially refused but finally agreed after patient conversation.</p>

<h2>Future Goals & Key Takeaways</h2>
<p>The story celebrates the fact that these workers, often earning modest wages and working without the recognition they deserve, have been central to one of the most significant public health achievements in Pakistan's history. Their work has helped bring the country from 20,000 cases annually in the early 1990s to the current situation where elimination is within reach.</p>
<p>The vaccine heroes deserve the admiration and support of every Pakistani. This story is a call to communities to honor their work by opening their doors and protecting their children.</p>
`

  return (
    <PolioInfoPage
      title="Vaccine Heroes Protect Every Child"
      path="/media-room/field-stories/vaccine-heroes-protect-every-child"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus", value: "Community Health" },
        { label: "Staff Role", value: "Frontline Workers" },
        { label: "Scope", value: "District Level" }
      ]}
    />
  )
}
