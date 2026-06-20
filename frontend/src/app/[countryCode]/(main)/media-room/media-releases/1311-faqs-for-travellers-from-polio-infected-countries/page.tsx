import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Polio Travel Requirements for Pakistan – FAQs on Vaccination Certificate, Approved Centers & WHO Guidelines | End Polio Pakistan",
  description: "Polio Travel Requirements for Pakistan – FAQs on Vaccination Certificate, Approved Centers & WHO Guidelines | End Polio Pakistan — this vaccination campaig...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/1311-faqs-for-travellers-from-polio-infected-countries",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p><strong>Polio Travel Requirements for Pakistan – FAQs on Vaccination Certificate, Approved Centers & WHO Guidelines | End Polio Pakistan</strong> — this vaccination campaign represents a critical operational round in Pakistan's ongoing strategy to interrupt wild poliovirus transmission. Coordinated by the National Emergency Operations Centre (NEOC), the campaign was launched across Pakistan to immunize vulnerable children under the age of five.</p>

<h2>Campaign Scope &amp; Cold Chain Management</h2>
<p>Frontline immunization teams were deployed to cover every single household using detailed microplans. Workers traveled from house to house in challenging weather conditions, carrying vaccine carriers equipped with temperature-monitoring devices to ensure the oral polio vaccine (OPV) remained potent and effective at 2-8°C.</p>
<p>Transit vaccination teams were posted at key public locations — including railway stations, bus stands, and highways — to ensure children traveling with their families did not miss their vital vaccine doses. Special coordination teams monitored the coverage in high-risk union councils in real-time using mobile tracking applications.</p>

<h2>Community Engagement &amp; Safety</h2>
<p>Prior to and during the campaign, dedicated social mobilizers worked with community elders and local mosques to encourage vaccine acceptance. Parents are urged to ensure their children receive the drops in every round, as repeated doses are essential to build strong, lifelong immunity against the virus.</p>`

  return (
    <PolioInfoPage
      title="Polio Travel Requirements for Pakistan – FAQs on Vaccination Certificate, Approved Centers & WHO Guidelines | End Polio Pakistan"
      path="/media-room/media-releases/1311-faqs-for-travellers-from-polio-infected-countries"
      contentHtml={content}
      metrics={[
        { label: "Campaign Focus", value: "National Round" },
        { label: "Target Scope", value: "Under-5 Children" },
        { label: "Year", value: "2024" },
        { label: "Status", value: "Concluded" }
      ]}
    />
  )
}
