import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Media Releases | Media Room | End Polio Pakistan",
  description: "The Media Releases section of End Polio Pakistan is the official source for all press statements, announcements, and updates issued by the Pakistan Polio E...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Media Releases section of End Polio Pakistan is the official source for all press statements, announcements, and updates issued by the Pakistan Polio Eradication Programme (PPEP). Journalists, researchers, health professionals, and members of the public can access verified, timely information directly from the programme here.</p>
<p>Each press release is carefully crafted to communicate new polio case confirmations, campaign launches, environmental surveillance results, partnership announcements, and government commitments. These releases ensure transparency and keep all stakeholders informed about the state of poliovirus in Pakistan.</p>
<p>The media room is updated regularly, often within hours of new developments. During major immunization campaigns or outbreaks, the frequency of releases increases to provide real-time updates. All content follows strict factual standards and is reviewed before publication.</p>
<p>Media releases also play an important role in countering misinformation. By providing clear, authoritative statements, the programme helps combat vaccine hesitancy and false narratives that have historically hindered eradication efforts in certain regions.</p>
<p>For anyone seeking the most accurate and up-to-date information about polio in Pakistan, this section is the definitive resource. It represents the programme's commitment to open communication with the media, the public, and the global health community.</p>`

  return (
    <PolioInfoPage
      title="Media Releases | Media Room | End Polio Pakistan"
      path="/media-room/media-releases"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Media Releases | Med..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
