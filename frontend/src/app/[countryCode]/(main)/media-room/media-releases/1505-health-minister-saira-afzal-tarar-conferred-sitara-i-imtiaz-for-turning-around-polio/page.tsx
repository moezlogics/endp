import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Health Minister Saira Afzal Tarar Conferred Sitara-i-Imtiaz for Turning Around Polio",
  description: "This press release announces the conferment of the Sitara-i-Imtiaz, one of Pakistan's highest civil honors, upon Federal Health Minister Saira Afzal Tarar...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/1505-health-minister-saira-afzal-tarar-conferred-sitara-i-imtiaz-for-turning-around-polio",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces the conferment of the Sitara-i-Imtiaz, one of Pakistan's highest civil honors, upon Federal Health Minister Saira Afzal Tarar in recognition of her extraordinary contributions to turning around Pakistan's polio eradication programme.</p>
<p>Minister Tarar's leadership during her tenure as Federal Minister for National Health Services was credited with revitalizing a programme that had been struggling with management challenges, accountability gaps, and a rising case burden. Her hands-on approach to programme oversight, her direct engagement with provincial governments, and her advocacy at international forums helped restore credibility to Pakistan's eradication efforts.</p>
<p>Under her leadership, new accountability frameworks were introduced, the National Emergency Operations Centre was strengthened, and political engagement at all levels of government was significantly enhanced. The programme recorded improved campaign coverage indicators and a decline in annual case numbers during her tenure.</p>
<p>The Sitara-i-Imtiaz is awarded by the President of Pakistan to individuals who have made distinguished contributions to the country in any field. Its conferment on a sitting health minister for polio-specific work is a recognition of how central the eradication effort is to Pakistan's national priorities.</p>
<p>This award also serves as a public acknowledgment that ending polio requires not just technical expertise but political leadership, personal commitment, and the courage to drive difficult institutional changes in the face of resistance.</p>`

  return (
    <PolioInfoPage
      title="Health Minister Saira Afzal Tarar Conferred Sitara-i-Imtiaz for Turning Around Polio"
      path="/media-room/media-releases/1505-health-minister-saira-afzal-tarar-conferred-sitara-i-imtiaz-for-turning-around-polio"
      contentHtml={content}
      metrics={[
        { label: "Oversight", value: "Federal & Provincial" },
        { label: "Policy Level", value: "National Emergency" },
        { label: "Year", value: "2024" },
        { label: "Coordination", value: "NEOC / EOCs" }
      ]}
    />
  )
}
