import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Eradication Within Reach in Pakistan | Polio in Pakistan",
  description: "This section emphasizes that polio eradication is achievable in Pakistan through sustained efforts and community participation. It highlights the progress...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/265-eradication-within-reach-in-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This section emphasizes that polio eradication is achievable in Pakistan through sustained efforts and community participation. It highlights the progress made in reducing polio cases and the ongoing commitment of the government and partners to eliminate the virus completely.</p>

<h2>Key Points</h2>
<p>Progress Made: The article acknowledges the significant reduction in polio cases achieved through years of vaccination campaigns and surveillance efforts.</p>
<p>Endurance and Commitment: It stresses the importance of maintaining momentum and consistency in immunization programs to reach every child.</p>
<p>Community Role: The importance of parental participation, especially mothers, in ensuring their children are vaccinated is highlighted.</p>
<p>Future Outlook: The section conveys a sense of optimism that with continued dedication, Pakistan can achieve and sustain polio-free status, protecting future generations from this preventable disease.</p>`

  return (
    <PolioInfoPage
      title="Eradication Within Reach in Pakistan | Polio in Pakistan"
      path="/polioin-pakistan/265-eradication-within-reach-in-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Programme", value: "Polio Eradication" },
        { label: "Coordinator", value: "NEOC Pakistan" },
        { label: "Coverage", value: "Nationwide" },
        { label: "Helpline", value: "1166" }
      ]}
    />
  )
}
