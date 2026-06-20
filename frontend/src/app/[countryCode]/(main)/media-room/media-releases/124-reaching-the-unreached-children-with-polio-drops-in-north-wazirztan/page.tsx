import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Reaching the Unreached Children with Polio Drops in North Waziristan",
  description: "This press release highlights a landmark achievement in one of Pakistan's most challenging operational environments: the successful delivery of polio drops...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/124-reaching-the-unreached-children-with-polio-drops-in-north-wazirztan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release highlights a landmark achievement in one of Pakistan's most challenging operational environments: the successful delivery of polio drops to previously unreached children in North Waziristan. For years, the ongoing conflict in North Waziristan had made it impossible to conduct regular vaccination campaigns, leaving a large pool of unimmunized children who were highly susceptible to poliovirus.</p>
<p>The ability to conduct vaccination activities in North Waziristan represented not just a public health achievement but a security and diplomatic breakthrough. The press release describes the negotiations with local authorities, the safety protocols established for vaccination teams, and the community engagement efforts that made the campaign possible.</p>
<p>Health workers entered previously inaccessible areas with the cooperation of local leaders and conducted house-to-house vaccination rounds, administering oral polio drops to thousands of children who had never received the vaccine. The emotional impact of these moments — children receiving their first polio drops after years of exclusion from the protection — is powerfully captured in this account.</p>
<p>The success in North Waziristan was cited as evidence that even the most challenging areas can be reached when there is political will, community cooperation, and operational creativity. It also demonstrated that polio workers, given appropriate support, can operate in conflict-affected environments.</p>
<p>The experience in North Waziristan continues to inform strategies for reaching children in other conflict-affected and insecure areas across Pakistan and globally.</p>`

  return (
    <PolioInfoPage
      title="Reaching the Unreached Children with Polio Drops in North Waziristan"
      path="/media-room/media-releases/124-reaching-the-unreached-children-with-polio-drops-in-north-wazirztan"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Reaching the Unreach..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
