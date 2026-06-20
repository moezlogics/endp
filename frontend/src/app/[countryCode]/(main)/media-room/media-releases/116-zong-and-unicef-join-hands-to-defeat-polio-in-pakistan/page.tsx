import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Zong and UNICEF Join Hands to Defeat Polio in Pakistan",
  description: "This press release announces a corporate partnership between Zong, one of Pakistan's leading mobile telecommunications companies, and UNICEF to support the...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/media-room/media-releases/116-zong-and-unicef-join-hands-to-defeat-polio-in-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>This press release announces a corporate partnership between Zong, one of Pakistan's leading mobile telecommunications companies, and UNICEF to support the country's polio eradication efforts. The partnership leverages Zong's extensive mobile network infrastructure to enhance the programme's outreach and communication capacity.</p>
<p>Under the partnership, Zong committed to sending vaccination reminder messages to millions of subscribers in high-risk areas before and during immunization campaigns. These SMS reminders inform parents about campaign dates, vaccination locations, and the importance of ensuring their children receive the polio drops.</p>
<p>Mobile communication has proven to be a highly effective tool for public health outreach in Pakistan, where mobile penetration rates are high even in rural and semi-urban areas. Text messages can reach parents who might otherwise miss announcements made through more traditional channels.</p>
<p>Zong also contributed to awareness campaigns through social media, billboard advertising, and in-store messaging at retail outlets. These efforts complemented the door-to-door vaccination and community mobilization activities conducted by health workers.</p>
<p>The partnership demonstrates the important role that private sector companies can play in supporting public health goals. By using their existing infrastructure and customer relationships, telecommunications companies can multiply the reach of health messages at relatively low cost.</p>
<p>This collaboration serves as a model for public-private partnerships in health communication, and Zong's involvement reflects corporate social responsibility in action — directly contributing to protecting millions of children from a preventable, paralyzing disease.</p>`

  return (
    <PolioInfoPage
      title="Zong and UNICEF Join Hands to Defeat Polio in Pakistan"
      path="/media-room/media-releases/116-zong-and-unicef-join-hands-to-defeat-polio-in-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Corporate Partner", value: "Zong" },
        { label: "Collaborator", value: "UNICEF / NEOC" },
        { label: "Engagement", value: "CSR Initiative" },
        { label: "Focus", value: "Public Awareness" }
      ]}
    />
  )
}
