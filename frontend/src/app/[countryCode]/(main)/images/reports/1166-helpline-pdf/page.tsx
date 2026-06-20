import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "1166 Polio Helpline Pakistan – Free Hotline to Report Unvaccinated Children, Vaccine Side Effects & Paralysis Cases | End Polio Pakistan",
  description: "The 1166 Polio Helpline is Pakistan's dedicated free telephone service for polio-related queries, reports, and concerns. This helpline connects the public...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/reports/1166%20Helpline.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The 1166 Polio Helpline is Pakistan's dedicated free telephone service for polio-related queries, reports, and concerns. This helpline connects the public directly to the Pakistan Polio Eradication Programme and serves as an important two-way communication channel between communities and the programme.</p>
<p>Members of the public can call 1166 to report children who were missed during a vaccination campaign, to inform teams about households where parents are refusing vaccination, to report suspected cases of acute flaccid paralysis that may indicate poliovirus infection, or to ask questions about the vaccine's safety and importance.</p>
<p>The helpline is staffed by trained operators who can handle calls in Urdu, Pashto, Sindhi, Punjabi, and other regional languages, ensuring accessibility across Pakistan's linguistic diversity. Calls are free from all mobile and landline networks, removing any financial barrier to participation.</p>
<p>Reports of missed or unvaccinated children are logged and forwarded to the relevant district vaccination team for follow-up. This mechanism is particularly valuable for identifying children in hard-to-reach households, families that have moved since the last campaign's microplan was prepared, or children born after the most recent household survey.</p>
<p>The 1166 helpline also serves as a rapid response channel for reporting potential paralysis cases, enabling the programme's acute flaccid paralysis surveillance system to respond within the 24-48 hours required to collect valid stool samples for laboratory testing. The helpline is a practical, accessible tool that puts polio eradication within reach of every Pakistani citizen.</p>`

  return (
    <PolioInfoPage
      title="1166 Polio Helpline Pakistan – Free Hotline to Report Unvaccinated Children, Vaccine Side Effects & Paralysis Cases | End Polio Pakistan"
      path="/images/reports/1166-helpline-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Official Report" },
        { label: "Publisher", value: "NEOC Pakistan" },
        { label: "Period", value: "Multi-Year" },
        { label: "Status", value: "Archived Reference" }
      ]}
    />
  )
}
