import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Sehat ka Ittehad Welcomed",
  description: "This press release welcomes the formation of Sehat ka Ittehad, a multi-stakeholder coalition bringing together government, civil society, religious institu...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/188-shehat-ka-ittehad-welcomed",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release welcomes the formation of Sehat ka Ittehad, a multi-stakeholder coalition bringing together government, civil society, religious institutions, and private sector actors to support health initiatives including polio eradication in Pakistan. The coalition represents a significant expansion of the social base for vaccination advocacy.</p>
<p>The formation of such a coalition acknowledges that polio eradication is not solely a government responsibility or a technical health matter — it is fundamentally a social challenge that requires broad community ownership. By uniting diverse stakeholders under a common banner, Sehat ka Ittehad aimed to amplify advocacy messages and reach communities that have historically been resistant to government-led health programmes.</p>
<p>Religious scholars within the coalition provided critical religious endorsements of vaccination, refuting false claims that had been used to justify vaccine refusals. Civil society organizations contributed their grassroots networks and community mobilization expertise.</p>
<p>Private sector members of the coalition contributed resources, media platforms, and employee engagement in vaccination awareness activities. Their involvement extended the coalition's reach into corporate networks and urban middle-class communities.</p>
<p>The programme welcomed this coalition because it recognized a fundamental truth: achieving universal vaccination coverage requires the active participation of the entire society. Health workers alone cannot reach every child if communities are not supportive and if parents do not open their doors.</p>
<p>Sehat ka Ittehad represents a model for mobilizing broad societal support around a public health goal and demonstrates that Pakistan's fight against polio is not just a government effort but a national mission.</p>`

  return (
    <PolioInfoPage
      title="Sehat ka Ittehad Welcomed"
      path="/media-room/media-releases/188-shehat-ka-ittehad-welcomed"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Sehat ka Ittehad Wel..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
