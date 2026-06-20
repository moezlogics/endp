import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update (December 2017): Progress and Main Highlights",
  description: "By December 2017, Pakistan had achieved one of its greatest victories against polio. The country recorded only 8 cases of wild poliovirus for the entire ye...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan-Polio-Update-DECEMBER-2017.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>By December 2017, Pakistan had achieved one of its greatest victories against polio. The country recorded only 8 cases of wild poliovirus for the entire year, marking the lowest number in the programme’s history.</p>
<p>1. Major Successes in 2017 Record Low Cases: With only 8 cases reported by December 2017 (compared to 20 cases in 2016), Pakistan was closer than ever to eliminating the virus.</p>
<p>Environmental Success: Sewage samples from most major cities came back negative, showing that the poliovirus was vanishing from the environment.</p>
<p>2. Remaining Challenges Despite the huge success, the virus remained active in a few specific areas:</p>
<p>North Waziristan (KP): This district continued to pose the biggest challenge due to its remoteness and security issues, which made it difficult for vaccination teams to reach every child.</p>
<p>Cross-Border Movement: Large numbers of families constantly travelling between Pakistan and Afghanistan posed a risk of reintroducing the virus.</p>
<p>3. The Strategy Moving Forward The National Emergency Operations Centre (NEOC) implemented targeted strategies to completely eradicate the virus:</p>
<p>Reaching Missed Children: Special campaigns were launched to find and vaccinate children who had been missed in previous drives.</p>
<p>Strengthening Vaccination Teams: More teams were deployed in high-risk areas, and rigorous training was provided to ensure every child received the vaccine safely.</p>
<p>Endgame Strategy: The programme worked closely with the Afghanistan Polio Eradication Programme to stop the virus from crossing borders.</p>
<p>The Main Takeaway: The December 2017 update highlighted that Pakistan was on the verge of eliminating polio. The success proved that with sustained effort and strong collaboration between the government, health workers, and communities, a polio-free Pakistan was finally within reach.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update (December 2017): Progress and Main Highlights"
      path="/images/polio-briefer/pakistan-polio-update-december-2017-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2017" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
