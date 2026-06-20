import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Workers Going Extra Miles for Vaccination",
  description: "This field story celebrates the extraordinary dedication of frontline polio workers who go far beyond the call of duty to vaccinate children in Pakistan's...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/polio-workers-going-extra-miles-for-vaccination",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story celebrates the extraordinary dedication of frontline polio workers who go far beyond the call of duty to vaccinate children in Pakistan's most challenging environments. From mountainous terrain in Khyber Pakhtunkhwa to flood-affected villages in Sindh, these workers demonstrate remarkable commitment every day.</p>
<p>The story follows vaccinators who wade through knee-deep floodwaters carrying vaccine coolers, climb steep mountain paths to reach isolated settlements, and return repeatedly to households where children were initially missed. Their resilience in the face of physical hardship, security threats, and community resistance is the backbone of Pakistan's eradication effort.</p>
<p>One of the most compelling aspects of this story is the role of female health workers. In conservative communities, female vaccinators gain access to homes and gain the trust of mothers in ways that male workers cannot. Their presence has dramatically increased coverage in areas previously considered unreachable.</p>
<p>These workers earn modest wages, yet their impact is immeasurable. Every child they vaccinate is a child protected from lifetime paralysis. Their stories humanize the statistics and remind us that behind every immunization figure is a dedicated individual who refused to give up.</p>
<p>This page is an important tribute to the unsung heroes of Pakistan's public health system and an inspiration for communities to support, rather than obstruct, their vital work.</p>`

  return (
    <PolioInfoPage
      title="Polio Workers Going Extra Miles for Vaccination"
      path="/media-room/field-stories/polio-workers-going-extra-miles-for-vaccination"
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
