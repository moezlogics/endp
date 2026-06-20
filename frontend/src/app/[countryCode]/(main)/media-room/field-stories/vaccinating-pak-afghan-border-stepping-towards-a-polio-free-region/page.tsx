import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Vaccinating at the Pak-Afghan Border: Stepping Towards a Polio-Free Region",
  description: "This field story documents the unique challenges and achievements of polio vaccination efforts along the Pakistan-Afghanistan border — one of the most crit...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/vaccinating-pak-afghan-border-stepping-towards-a-polio-free-region",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story documents the unique challenges and achievements of polio vaccination efforts along the Pakistan-Afghanistan border — one of the most critical and complex frontiers in the global eradication effort. The border region is characterized by high population movement, difficult terrain, shared virus strains, and historically low immunization coverage.</p>
<p>Vaccination teams operating along the border work under especially demanding conditions. They must cover transit points, border crossing stations, and nomadic communities who move regularly between the two countries. Missing even a small number of these highly mobile children can allow poliovirus to spread across provinces and international boundaries.</p>
<p>The story highlights the Joint Cross-Border Coordination initiative between Pakistan and Afghanistan, where both countries synchronize vaccination campaigns to ensure that no child slips through the gaps during cross-border movement. This cooperation has been credited with interrupting several potential transmission chains.</p>
<p>Health workers in these regions demonstrate extraordinary resolve, often working in areas with limited infrastructure, inadequate security guarantees, and communities with deep-rooted mistrust of vaccines.</p>
<p>Their work is central to ending polio not just in Pakistan but in the broader region. As long as the virus circulates on either side of the border, neither country can be declared polio-free. This story celebrates those working at the very edge of the eradication frontier.</p>`

  return (
    <PolioInfoPage
      title="Vaccinating at the Pak-Afghan Border: Stepping Towards a Polio-Free Region"
      path="/media-room/field-stories/vaccinating-pak-afghan-border-stepping-towards-a-polio-free-region"
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
