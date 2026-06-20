import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Donors and Partners Discuss Path Forward for Polio Eradication",
  description: "This press release reports on a high-level meeting of donors and partners convened to assess the state of Pakistan's polio eradication programme and agree...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2194-donors-partners-discuss-path-forward-for-polio-eradication",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release reports on a high-level meeting of donors and partners convened to assess the state of Pakistan's polio eradication programme and agree on a path forward. The meeting brought together representatives from major funding organizations including the Bill & Melinda Gates Foundation, USAID, UKAID, and Gulf donors alongside UN agencies and the Pakistani government.</p>
<p>The meeting addressed concerns about programme performance, including rising case counts, persistent transmission hotspots, and gaps in community engagement. Participants reviewed detailed programme data and engaged in candid discussions about what structural changes were needed to achieve better results.</p>
<p>Donors expressed continued commitment to supporting Pakistan's eradication effort while emphasizing the importance of improved accountability, stronger government ownership, and evidence-based programme adaptation. They called for more transparent reporting on campaign quality and the implementation of recommendations from independent monitoring reviews.</p>
<p>The path forward agreed at the meeting included enhanced funding for emergency campaigns in high-risk areas, additional technical assistance for community mobilization and behaviour change communication, and strengthened cross-border coordination with Afghanistan.</p>
<p>The meeting concluded with a shared understanding that ending polio in Pakistan is a global priority and that the international community would maintain its support, but that Pakistan itself needed to demonstrate the political will and operational discipline to translate this support into results.</p>`

  return (
    <PolioInfoPage
      title="Donors and Partners Discuss Path Forward for Polio Eradication"
      path="/media-room/media-releases/2194-donors-partners-discuss-path-forward-for-polio-eradication"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Donors and Partners ..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
