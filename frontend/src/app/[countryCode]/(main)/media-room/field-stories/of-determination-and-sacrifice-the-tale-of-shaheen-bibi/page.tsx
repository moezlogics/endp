import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Of Determination and Sacrifice: The Tale of Shaheen Bibi",
  description: "This field story tells the inspiring and moving account of Shaheen Bibi, a frontline polio vaccinator whose dedication to protecting children's health came...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/field-stories/of-determination-and-sacrifice-the-tale-of-shaheen-bibi",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This field story tells the inspiring and moving account of Shaheen Bibi, a frontline polio vaccinator whose dedication to protecting children's health came at great personal cost. Her story represents the courage of thousands of female health workers across Pakistan who continue their work despite threats, social pressure, and difficult conditions.</p>
<p>Shaheen Bibi worked in one of Pakistan's most challenging environments, going door to door in communities where vaccine resistance was common and where the safety of health workers could not always be guaranteed. Despite facing hostility from some community members and personal hardships, she remained committed to her mission.</p>
<p>Her story is not unique. Many frontline polio workers across Khyber Pakhtunkhwa, Balochistan, and other high-risk provinces have faced and continue to face similar challenges. Some have paid the ultimate sacrifice. Their determination is what makes Pakistan's eradication programme possible.</p>
<p>This narrative humanizes the polio eradication effort, reminding readers that statistics and case counts represent real people — both the children protected and the workers who protect them. Shaheen Bibi's story is a testament to the power of individual commitment in the service of public health.</p>
<p>The story also serves as a call to communities and authorities to protect and value health workers, recognizing them as essential contributors to national progress and child welfare.</p>`

  return (
    <PolioInfoPage
      title="Of Determination and Sacrifice: The Tale of Shaheen Bibi"
      path="/media-room/field-stories/of-determination-and-sacrifice-the-tale-of-shaheen-bibi"
      contentHtml={content}
      metrics={[
        { label: "Document Type", value: "Field Story" },
        { label: "Focus Area", value: "Community Reach" },
        { label: "Role", value: "Frontline Mobilizer" },
        { label: "Status", value: "Field Report" }
      ]}
    />
  )
}
