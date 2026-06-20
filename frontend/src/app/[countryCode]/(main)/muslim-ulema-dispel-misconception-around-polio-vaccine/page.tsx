import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Muslim Ulema Dispel Misconceptions Around Polio Vaccine",
  description: "This article highlights the significant role of Islamic scholars (Ulema) in combating misinformation and promoting polio vaccination across Pakistan. It ad...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/muslim-ulema-dispel-misconception-around-polio-vaccine",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This article highlights the significant role of Islamic scholars (Ulema) in combating misinformation and promoting polio vaccination across Pakistan. It addresses the critical need for religious leaders to actively support polio eradication efforts by dispelling myths and encouraging parents to vaccinate their children.</p>

<h2>Key Points</h2>
<p>Role of Religious Leaders: The article emphasizes that Muslim Ulema play a crucial role in building trust within communities, particularly in areas where vaccine hesitancy is prevalent.</p>
<p>Combating Misinformation: By providing religious guidance, the Ulema help counter false rumors and misconceptions about the safety and necessity of polio vaccines.</p>
<p>Community Engagement: Their involvement is vital for ensuring high vaccination coverage, as many parents rely on the advice of religious scholars when making decisions about their children's health.</p>
<p>Call to Action: The piece serves as a call to action for religious leaders to continue their support for polio eradication, emphasizing that vaccination aligns with Islamic principles of preserving life and protecting health.</p>`

  return (
    <PolioInfoPage
      title="Muslim Ulema Dispel Misconceptions Around Polio Vaccine"
      path="/muslim-ulema-dispel-misconception-around-polio-vaccine"
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
