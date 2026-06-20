import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "FAQs – Urdu",
  description: "The Urdu-language Frequently Asked Questions page addresses common concerns and queries about polio vaccination in Pakistan's national language, making ess...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/urdu/knowledge-centre/faqs",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Urdu-language Frequently Asked Questions page addresses common concerns and queries about polio vaccination in Pakistan's national language, making essential health information accessible to the widest possible audience. Since a large proportion of Pakistan's population — particularly in rural and conservative communities — is more comfortable reading in Urdu, this page plays a critical role in the programme's communication strategy.</p>
<p>The FAQs address the most commonly asked questions about polio vaccination: Is the vaccine safe? Is it halal? Why do children need multiple doses? What happens if a child has already been vaccinated? Can the vaccine cause polio? Each question is answered clearly, concisely, and in language that is accessible to readers without a medical background.</p>
<p>The religious permissibility of vaccination is addressed through references to fatwas from respected Islamic scholars and citations from Quranic verses and Hadith that support the duty to protect children's health. This integration of religious context into health information has proven effective in addressing hesitancy among conservative communities.</p>
<p>The Urdu FAQ page also explains the role of environmental surveillance, what parents should do if their child shows signs of paralysis, and how to find vaccination centers in their area. Practical guidance alongside factual information makes this page a one-stop resource for Pakistani parents.</p>
<p>By providing accurate, trustworthy information in Urdu, the programme helps counter the misinformation and myths that have historically fueled vaccine refusal, directly contributing to the goal of protecting every Pakistani child from poliovirus.</p>`

  return (
    <PolioInfoPage
      title="FAQs – Urdu"
      path="/urdu/knowledge-centre/faqs"
      contentHtml={content}
      metrics={[
        { label: "صفحہ کا عنوان", value: "FAQs – Urdu" },
        { label: "ادارہ", value: "این ای او سی پاکستان" },
        { label: "ہیلپ لائن", value: "1166" },
        { label: "مہم کی حالت", value: "فعال (Active)" }
      ]}
      dir="rtl"
    />
  )
}
