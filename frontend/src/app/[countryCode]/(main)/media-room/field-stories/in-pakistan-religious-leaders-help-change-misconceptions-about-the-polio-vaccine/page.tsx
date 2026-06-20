import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "In Pakistan, Religious Leaders Help Change Misconceptions About the Polio Vaccine",
  description: "This field story explores the transformative role that religious leaders have played in changing community attitudes toward polio vaccination in Pakistan....",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/in-pakistan-religious-leaders-help-change-misconceptions-about-the-polio-vaccine",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story explores the transformative role that religious leaders have played in changing community attitudes toward polio vaccination in Pakistan. In a country where religious authority shapes daily life in profound ways, the engagement of trusted Islamic scholars has been one of the most effective strategies for addressing vaccine hesitancy.</p>
<p>The story features specific religious leaders in KP and Balochistan who made the deliberate choice to use their platforms to advocate for vaccination. Their journeys from observers to active champions of immunization are documented in detail, revealing the personal motivations and community dynamics that influenced their decisions.</p>
<p>One powerful narrative thread involves a religious scholar who had previously been skeptical of the vaccine, worried by rumors he had heard in his community. After engaging with programme staff, reviewing scientific evidence, and consulting with senior Islamic scholars, he became a vocal advocate, personally accompanying vaccination teams in his village and addressing concerns from mosque pulpits.</p>
<p>The field story also documents the impact of these religious endorsements: measurable reductions in vaccine refusals in areas where respected scholars advocated for vaccination, increased household access for vaccination teams, and changed community conversations about the vaccine.</p>
<p>The engagement of religious leadership represents a model of culturally sensitive public health communication — one that respects community values and works within existing trust structures rather than against them. This approach has been credited as one of the most important innovations in Pakistan's eradication communication strategy.</p>`

  return (
    <PolioInfoPage
      title="In Pakistan, Religious Leaders Help Change Misconceptions About the Polio Vaccine"
      path="/media-room/field-stories/in-pakistan-religious-leaders-help-change-misconceptions-about-the-polio-vaccine"
      contentHtml={content}
      metrics={[
        { label: "Religious Authority", value: "Islamic Scholars" },
        { label: "Ruling", value: "Halal / Obligatory" },
        { label: "Key Principle", value: "Preservation of Life" },
        { label: "Community Role", value: "Refusal Resolution" }
      ]}
    />
  )
}
