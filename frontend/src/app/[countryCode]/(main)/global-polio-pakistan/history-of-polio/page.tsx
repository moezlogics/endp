import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "History of Polio | Global Polio – Pakistan | End Polio Pakistan",
  description: "The history of polio is a story that stretches back thousands of years. Ancient Egyptian carvings dating to around 1400 BCE show figures with withered limb...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/global-polio-pakistan/history-of-polio",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The history of polio is a story that stretches back thousands of years. Ancient Egyptian carvings dating to around 1400 BCE show figures with withered limbs — among the earliest known depictions of what is now recognized as poliomyelitis. For most of human history, the disease was a common and accepted tragedy, a routine cause of childhood disability with no explanation and no cure.</p>
<p>The modern medical understanding of polio began in the 19th century, when outbreaks became larger and more frequent as improved sanitation ironically reduced childhood exposure, leaving older children and adults vulnerable. The great epidemic years of the early 20th century, particularly in Europe and North America, created widespread fear and drove urgent scientific research.</p>
<p>The development of the Salk inactivated polio vaccine in 1955 and the Sabin oral polio vaccine in 1961 transformed the global picture. Mass vaccination campaigns rapidly reduced cases across developed countries. In 1988, the Global Polio Eradication Initiative was launched with the goal of ending polio worldwide.</p>
<p>Pakistan has been fighting polio since before independence. In the early 1990s, Pakistan recorded approximately 20,000 cases annually. Through decades of vaccination campaigns, surveillance, and community engagement, that number has been reduced by more than 99 percent. Today, Pakistan and Afghanistan remain the only two countries where wild poliovirus has never been interrupted — making their eradication the final frontier in one of humanity's greatest public health achievements.</p>`

  return (
    <PolioInfoPage
      title="History of Polio | Global Polio – Pakistan | End Polio Pakistan"
      path="/global-polio-pakistan/history-of-polio"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "History of Polio | G..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
