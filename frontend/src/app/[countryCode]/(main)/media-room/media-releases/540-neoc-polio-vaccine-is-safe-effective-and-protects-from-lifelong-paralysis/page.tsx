import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "NEOC: Polio Vaccine is Safe, Effective and Protects from Lifelong Paralysis",
  description: "This press release from the National Emergency Operations Centre provides an authoritative statement on the safety and effectiveness of the polio vaccine i...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/540-neoc-polio-vaccine-is-safe-effective-and-protects-from-lifelong-paralysis",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release from the National Emergency Operations Centre provides an authoritative statement on the safety and effectiveness of the polio vaccine in response to misinformation circulating in communities. The statement was issued to counter a specific wave of anti-vaccination messaging that had been spreading through social media and word of mouth.</p>
<p>The NEOC's statement addresses the most common false claims about the polio vaccine one by one: that it causes infertility, that it contains haram ingredients, that it is a conspiracy to harm Muslim children, and that it can itself cause polio. Each claim is refuted with clear evidence and referenced to authoritative scientific and religious sources.</p>
<p>The safety profile of the oral polio vaccine is explained in accessible terms: it has been administered billions of times globally over more than 60 years, it has undergone rigorous testing and regulatory review, and its side effects are minimal compared to its extraordinary protective benefits. The vaccine has been used to reduce global polio cases by more than 99 percent.</p>
<p>The statement also explains the mechanism by which the vaccine works: by stimulating the immune system to produce antibodies against poliovirus, it provides durable protection that prevents paralysis even if the child is exposed to the virus in the environment.</p>
<p>The NEOC statement concludes with a direct appeal to parents: trust the science, trust the religious endorsements, and protect your children. There is no cure for polio-induced paralysis — prevention through vaccination is the only option.</p>`

  return (
    <PolioInfoPage
      title="NEOC: Polio Vaccine is Safe, Effective and Protects from Lifelong Paralysis"
      path="/media-room/media-releases/540-neoc-polio-vaccine-is-safe-effective-and-protects-from-lifelong-paralysis"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "NEOC: Polio Vaccine ..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
