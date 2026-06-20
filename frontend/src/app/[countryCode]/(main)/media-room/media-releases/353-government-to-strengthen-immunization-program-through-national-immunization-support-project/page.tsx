import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Government to Strengthen Immunization Program Through National Immunization Support Project",
  description: "This press release announces the government's commitment to strengthen Pakistan's overall immunization system through the National Immunization Support Pro...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/353-government-to-strengthen-immunization-program-through-national-immunization-support-project",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces the government's commitment to strengthen Pakistan's overall immunization system through the National Immunization Support Project (NISP), a comprehensive initiative supported by international development partners including the World Bank and GAVI, the Vaccine Alliance.</p>
<p>The NISP recognizes that while polio has received significant international attention and resources, Pakistan's broader routine immunization system remains weak. Low coverage for vaccines against measles, tetanus, diphtheria, pertussis, and other preventable diseases leaves millions of children vulnerable to multiple illnesses simultaneously.</p>
<p>The project aims to build permanent immunization infrastructure that will outlast the polio programme and serve Pakistani children for generations. Key components include establishing functional cold chain systems at district and union council levels, training and deploying a sustainable cadre of routine immunization workers, and improving data systems to track vaccination coverage in real time.</p>
<p>Strengthening routine immunization also benefits the polio programme directly. When parents regularly engage with health workers through routine immunization, trust is built that makes them more receptive to polio vaccines. A strong routine immunization system creates the social infrastructure on which emergency campaigns can build.</p>
<p>The government's commitment to NISP reflects an understanding that ending polio is only one part of a larger agenda to protect all Pakistani children from preventable illness, and that the investment in immunization infrastructure is an investment in Pakistan's future health and development.</p>`

  return (
    <PolioInfoPage
      title="Government to Strengthen Immunization Program Through National Immunization Support Project"
      path="/media-room/media-releases/353-government-to-strengthen-immunization-program-through-national-immunization-support-project"
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
