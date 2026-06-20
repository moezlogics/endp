import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update | Media Room | End Polio Pakistan",
  description: "Pakistan Polio Update | Media Room | End Polio Pakistan — this page provides comprehensive information about a key aspect of Pakistan's polio eradication p...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/pakistan-polio-update",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>Pakistan Polio Update | Media Room | End Polio Pakistan — this page provides comprehensive information about a key aspect of Pakistan's polio eradication programme. As one of the world's most complex public health initiatives, the programme encompasses vaccination campaigns, disease surveillance, community engagement, and cross-border coordination — all working together toward the goal of eliminating poliovirus from its last remaining strongholds.</p>

<h2>Background &amp; Context</h2>
<p>Pakistan, together with Afghanistan, represents the final frontier in the global fight against polio. The country has made extraordinary progress — reducing cases by more than 99% since the 1990s when tens of thousands of children were paralyzed annually. This achievement is the result of sustained effort by over 350,000 frontline workers, supported by government commitment at all levels and partnership with international organizations including WHO, UNICEF, Rotary International, and the Bill &amp; Melinda Gates Foundation.</p>
<p>The programme's operational infrastructure is remarkable in its scale and complexity. Each national vaccination campaign requires the simultaneous deployment of hundreds of thousands of workers across every district in the country, supported by cold chain logistics to maintain vaccine potency, real-time digital monitoring systems, and community engagement networks that reach into the most remote and challenging areas.</p>

<h2>Significance &amp; Impact</h2>
<p>Every aspect of the programme — from laboratory analysis of virus samples to the conversation a female health worker has with a hesitant mother at her doorstep — contributes to the larger goal of ensuring that no child in Pakistan is ever paralyzed by poliovirus again. The programme's success will mark only the second time in human history that a disease has been completely eradicated, following the elimination of smallpox in 1980.</p>
<p>For more information about Pakistan's polio eradication effort, contact the Sehat Tahaffuz Helpline at 1166, available free of charge from all networks nationwide.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update | Media Room | End Polio Pakistan"
      path="/media-room/pakistan-polio-update"
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
