import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "English Declaration for Polio Eradication",
  description: "The English Declaration for Polio Eradication is a foundational declaration of support for the Global Polio Eradication Initiative. This document outlines...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/beta/images/reports/English-Declaration.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The English Declaration for Polio Eradication is a foundational declaration of support for the Global Polio Eradication Initiative. This document outlines the joint commitment of international partners, Islamic scholars, public health professionals, and global leaders to support polio eradication efforts, particularly focusing on the remaining endemic challenges in Pakistan and Afghanistan.</p>
<p>The declaration emphasizes that the administration of the oral polio vaccine is a humanitarian and religious obligation to protect children from lifelong paralysis. It dispels myths surrounding vaccine safety, referencing authoritative medical science and religious consensus from leading Islamic advisory groups.</p>
<p>Through this declaration, signatories pledge to secure access to all children, support frontline health workers, protect vaccine distribution cold chains, and enhance community trust. It serves as a unified policy guide for international health bodies, national governments, and non-governmental organizations working in coordination to end polio.</p>
<p>Transparent monitoring and sustained support from the global community are key elements highlighted in the declaration, reinforcing the global objective to interrupt all poliovirus transmission transmission chains.</p>`

  return (
    <PolioInfoPage
      title="English Declaration for Polio Eradication"
      path="/beta/images/reports/english-declaration-pdf"
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
