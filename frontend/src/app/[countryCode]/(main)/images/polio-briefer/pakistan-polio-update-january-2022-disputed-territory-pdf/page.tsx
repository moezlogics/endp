import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Pakistan Polio Update (January 2022): Progress and Main Highlights",
  description: "By January 2022, Pakistan was making historic progress in its fight against polio. The country recorded one of its lowest case numbers ever, showing that t...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/images/polio-briefer/Pakistan%20Polio%20Update%20January%202022%20disputed%20territory.pdf",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>By January 2022, Pakistan was making historic progress in its fight against polio. The country recorded one of its lowest case numbers ever, showing that the continuous hard work of health teams was yielding great results. 1. Key Successes & Case Count Record Low Cases: Pakistan reported only 1 case of Wild Poliovirus (WPV1) for the entire year of 2021, which was a massive achievement compared to previous years.</p>
<p>Fewer Positive Sewage Samples: The virus was disappearing from the environment too. Most cities reported that their sewage water tests came back completely negative for the poliovirus, meaning the active circulation of the virus had dropped drastically.</p>
<p>2. Major Focus Areas in January 2022 Even with low cases, the programme stayed alert and focused heavily on high-risk zones, including:</p>
<p>The Quetta Block (Balochistan) and South Khyber Pakhtunkhwa (KP), where small pockets of the virus were still trying to survive.</p>
<p>Cross-Border Movement: Special attention was given to borders and transit points because a large number of families constantly move between Pakistan and Afghanistan, which can accidentally carry the virus back and forth.</p>
<p>3. The Strategy Moving Forward The National Emergency Operations Centre (NEOC) implemented these strict guidelines to keep the virus from coming back:</p>
<p>First Sub-National Campaign of 2022: A massive campaign was launched in January to target millions of young children in the highest priority districts.</p>
<p>Closing Immunity Gaps: Teams put extra effort into finding and vaccinating "persistently missed children"—those who were absent during previous drives or whose parents had refused.</p>
<p>Stronger Vaccine Management: The programme focused on training frontline workers to handle vaccines carefully and map out every neighborhood perfectly.</p>
<p>The Main Takeaway: The January 2022 update showed that Pakistan was closer than ever to being polio-free. However, the programme warned that health teams must not relax because even a single missed child could allow the virus to rise again.</p>`

  return (
    <PolioInfoPage
      title="Pakistan Polio Update (January 2022): Progress and Main Highlights"
      path="/images/polio-briefer/pakistan-polio-update-january-2022-disputed-territory-pdf"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "NEOC Briefer" },
        { label: "Source", value: "NEOC / WHO" },
        { label: "Period", value: "2022" },
        { label: "Format", value: "Technical Update" }
      ]}
    />
  )
}
