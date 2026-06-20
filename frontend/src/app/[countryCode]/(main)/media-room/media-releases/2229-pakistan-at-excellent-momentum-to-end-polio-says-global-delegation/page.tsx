import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan at Excellent Momentum to End Polio, Says Global Delegation",
  description: "A high-level delegation from the Global Polio Eradication Initiative (GPEI) visited Pakistan and concluded that the country has achieved excellent momentum...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/2229-pakistan-at-excellent-momentum-to-end-polio-says-global-delegation",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>A high-level delegation from the Global Polio Eradication Initiative (GPEI) visited Pakistan and concluded that the country has achieved excellent momentum in its drive to end poliovirus transmission. The delegation, which included representatives from WHO, UNICEF, the Bill & Melinda Gates Foundation, and Rotary International, reviewed programme performance and met with senior government officials.</p>
<p>The visiting team praised Pakistan's commitment at the highest levels of government, noting the prime minister's personal engagement in the eradication agenda. They highlighted improvements in campaign quality, expansion of environmental surveillance, and stronger cross-border coordination with Afghanistan.</p>
<p>The delegation also acknowledged the extraordinary dedication of frontline workers, including hundreds of thousands of vaccinators who brave difficult conditions to reach children in remote and insecure areas. Special recognition was given to female health workers whose community access has proven essential in areas where male workers face resistance.</p>
<p>Despite the positive assessment, the delegation urged the programme to sustain this momentum, address remaining pockets of vaccine refusal, and ensure that no child is missed in upcoming campaigns.</p>
<p>The visit reinforced international confidence in Pakistan's ability to end polio, while reminding stakeholders that the final phase of eradication demands even greater precision, resources, and community engagement than previous stages.</p>`

  return (
    <PolioInfoPage
      title="Pakistan at Excellent Momentum to End Polio, Says Global Delegation"
      path="/media-room/media-releases/2229-pakistan-at-excellent-momentum-to-end-polio-says-global-delegation"
      contentHtml={content}
      metrics={[
        { label: "Delegation Type", value: "GPEI Global Board" },
        { label: "Review Focus", value: "NEOC Operations" },
        { label: "Key Finding", value: "Excellent Dedication" },
        { label: "Global Status", value: "Urgent Priority" }
      ]}
    />
  )
}
