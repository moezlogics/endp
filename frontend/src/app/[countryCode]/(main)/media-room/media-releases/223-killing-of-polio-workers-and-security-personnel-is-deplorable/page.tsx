import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Killing of Polio Workers and Security Personnel is Deplorable",
  description: "This press release is a strong condemnation issued by the Pakistan Polio Eradication Programme in response to targeted attacks on polio vaccination teams a...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/223-killing-of-polio-workers-and-security-personnel-is-deplorable",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release is a strong condemnation issued by the Pakistan Polio Eradication Programme in response to targeted attacks on polio vaccination teams and their security escorts. The killing of health workers engaged in life-saving immunization activities represents one of the most tragic and outrageous forms of obstruction to public health.</p>
<p>In this statement, programme officials express grief and outrage at the loss of lives and call on all segments of Pakistani society — including political leaders, religious scholars, community elders, and security forces — to unite in protecting health workers.</p>
<p>The attacks on polio workers, which have occurred primarily in Khyber Pakhtunkhwa and Balochistan, were motivated by false narratives spread by extremist elements claiming that the polio vaccine was a Western conspiracy or a sterilization tool. These dangerous myths have been categorically rejected by Islamic scholars, doctors, and community leaders across Pakistan.</p>
<p>The press release demands accountability for perpetrators and calls for enhanced security measures for vaccination teams. It also appeals to community members to report threats and cooperate with law enforcement to prevent future attacks.</p>
<p>The killing of polio workers is not merely a local tragedy — it is an obstacle to global health security. Every attack halts campaigns, leaves children unprotected, and delays eradication. This statement reflects the programme's determination to continue despite violence and its resolve that the mission to end polio will not be stopped.</p>`

  return (
    <PolioInfoPage
      title="Killing of Polio Workers and Security Personnel is Deplorable"
      path="/media-room/media-releases/223-killing-of-polio-workers-and-security-personnel-is-deplorable"
      contentHtml={content}
      metrics={[
        { label: "Focus", value: "Worker Safety" },
        { label: "Protocol", value: "Security Escort" },
        { label: "Coordination", value: "EOC & Police" },
        { label: "Priority", value: "Critical Care" }
      ]}
    />
  )
}
