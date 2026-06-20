import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Maulana Sami ul Haq's Fatwa on Polio Vaccination (2nd Release)",
  description: "This second press release reiterating and reinforcing Maulana Sami ul Haq's fatwa on polio vaccination reflects the ongoing importance of religious endorse...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/1292-maulana-sami-ul-haq-s-fatwa-on-polio-vaccination",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This second press release reiterating and reinforcing Maulana Sami ul Haq's fatwa on polio vaccination reflects the ongoing importance of religious endorsements in the programme's community engagement strategy. The reissuance of key religious pronouncements at critical junctures helps sustain their impact and reach new audiences over time.</p>
<p>Vaccine hesitancy rooted in religious concerns has been a persistent challenge in parts of Khyber Pakhtunkhwa and other conservative communities in Pakistan. By regularly highlighting the fatwa from an authority as respected as Maulana Sami ul Haq, the programme reaffirms that mainstream Islamic scholarship supports vaccination.</p>
<p>The release contextualizes the original fatwa within the current state of poliovirus transmission and the urgent need for community cooperation with vaccination campaigns. It explains that the Islamic duty to protect children from harm clearly applies to accepting a safe, life-protecting vaccine.</p>
<p>This press release also serves as a reference resource for vaccination teams and community mobilizers working in resistant communities. Being able to cite a credible fatwa from a recognized religious authority is a powerful tool for overcoming objections raised by community members on religious grounds.</p>
<p>The sustained engagement with religious leadership reflects the programme's strategic understanding that in communities where faith guides daily life, health messages must be framed within a religious context to be effective. This approach has been credited with reducing vaccine refusals in several previously resistant districts.</p>`

  return (
    <PolioInfoPage
      title="Maulana Sami ul Haq's Fatwa on Polio Vaccination (2nd Release)"
      path="/media-room/media-releases/1292-maulana-sami-ul-haq-s-fatwa-on-polio-vaccination"
      contentHtml={content}
      metrics={[
        { label: "Religious Authority", value: "Islamic Scholars" },
        { label: "Ruling", value: "Halal / Obligatory" },
        { label: "Key Principle", value: "Preservation of Life" },
        { label: "Community Role", value: "Refusal Resolution" }
      ]}
    />
  )
}
