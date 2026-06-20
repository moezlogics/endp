import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Dr. Rana Muhammad Safdar: Biography & Contributions",
  description: "Dr. Rana Muhammad Safdar is a highly respected public health expert and epidemiologist (a scientist who tracks diseases) in Pakistan. He has played a major...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/rana-muhammad-safdar-coordinator-national-emergency-operations-centre-for-polio-eradication",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>Dr. Rana Muhammad Safdar is a highly respected public health expert and epidemiologist (a scientist who tracks diseases) in Pakistan. He has played a major leadership role in the country’s fight to eliminate the poliovirus.</p>
<p>1. Education and Background He completed his medical degree (MBBS) in Pakistan and went on to earn advanced degrees, including a Master of Public Health (MPH) and an M.Sc in Epidemiology.</p>
<p>Before leading the polio programme, he gained extensive experience working with the government's health departments, specializing in tracking infectious diseases and managing health emergencies.</p>
<p>2. Leadership at the NEOC Dr. Safdar was appointed as the National Coordinator for the National Emergency Operations Centre (NEOC) for Polio Eradication.</p>
<p>His main job was to bring together all provincial teams, international health partners, and the government to work under one unified plan.</p>
<p>Under his management, the emergency centers became highly digitalized, making it easier to track vaccination teams and instantly see which areas were being missed.</p>
<p>3. Key Achievements & Strategies Using Smart Data: He shifted the programme away from guesswork and focused heavily on high-quality data to see exactly where the virus was hiding.</p>
<p>Targeting High-Risk Hubs: He helped design specific, intense strategies for major virus reservoirs like Peshawar, Karachi, and the Quetta block.</p>
<p>Global Partnerships: He worked closely with international organizations like the World Health Organization (WHO), UNICEF, and the Bill & Melinda Gates Foundation to ensure Pakistan's polio programme met global standards.</p>
<p>The Main Takeaway: Dr. Rana Muhammad Safdar is widely recognized as one of the key scientific minds who modernized Pakistan's polio eradication system, making the nationwide vaccination campaigns much more organized, data-driven, and effective.</p>`

  return (
    <PolioInfoPage
      title="Dr. Rana Muhammad Safdar: Biography & Contributions"
      path="/rana-muhammad-safdar-coordinator-national-emergency-operations-centre-for-polio-eradication"
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
