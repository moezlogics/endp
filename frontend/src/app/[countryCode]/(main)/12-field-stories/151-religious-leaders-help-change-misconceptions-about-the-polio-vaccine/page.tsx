import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Religious Leaders Help Change Misconceptions About the Polio Vaccine",
  description: "This earlier field story from the End Polio Pakistan archive documents the pioneering efforts of religious leaders in Pakistan to address and correct the d...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/12-field-stories/151-religious-leaders-help-change-misconceptions-about-the-polio-vaccine",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This earlier field story from the End Polio Pakistan archive documents the pioneering efforts of religious leaders in Pakistan to address and correct the dangerous misconceptions about polio vaccination that had been spreading through communities. Religious opposition to vaccination, even when held by a minority, had significant consequences for the programme's ability to reach every child.</p>
<p>The story chronicles the early stages of religious community engagement, when programme staff first began systematically approaching mosque leaders, madrassa heads, and respected local scholars to discuss the polio vaccine. Initial conversations were sometimes difficult, with some religious figures expressing the same concerns that existed in their communities.</p>
<p>Through patient dialogue, provision of scientific information in accessible formats, engagement with senior Islamic scholars at national and international levels, and facilitation of direct interactions between religious leaders and health professionals, attitudes gradually began to shift.</p>
<p>Religious leaders who became convinced of the vaccine's permissibility and importance became some of the programme's most powerful advocates. Their Friday sermons reached congregations that health workers could never access directly. Their personal calls to families helped convert vaccine refusers into vaccine accepters.</p>
<p>This archive story marks an important early chapter in what would become one of the most successful religious community engagement strategies in global public health, demonstrating that with patience, respect, and genuine dialogue, religious authority can become an asset rather than an obstacle to vaccination.</p>`

  return (
    <PolioInfoPage
      title="Religious Leaders Help Change Misconceptions About the Polio Vaccine"
      path="/12-field-stories/151-religious-leaders-help-change-misconceptions-about-the-polio-vaccine"
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
