import { Metadata } from "next"
import PolioInfoPage from "@modules/common/components/polio-info-page"

export const metadata: Metadata = {
  title: "Global Polio – Pakistan | End Polio Pakistan",
  description: "The Global Polio – Pakistan page situates Pakistan's eradication journey within the broader global context of the fight against poliovirus. Since the launc...",
  alternates: {
    canonical: "https://www.endpolio.com.pk/global-polio-pakistan",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  const content = `<p>The Global Polio – Pakistan page situates Pakistan's eradication journey within the broader global context of the fight against poliovirus. Since the launch of the Global Polio Eradication Initiative in 1988, cases worldwide have been reduced by more than 99 percent. However, wild poliovirus persists in Pakistan and Afghanistan as the last two endemic countries.</p>
<p>This page explains how Pakistan fits into the global eradication architecture. International organizations including WHO, UNICEF, Rotary International, the US CDC, and the Bill & Melinda Gates Foundation provide technical, financial, and logistical support to Pakistan's national programme.</p>
<p>The global stakes are high. As long as poliovirus circulates anywhere in the world, it poses a risk to children everywhere. Imported cases have re-infected previously polio-free countries, demonstrating that global eradication is the only permanent solution. Pakistan's success or failure directly affects global health security.</p>
<p>This section also explains the different types of poliovirus — wild poliovirus and vaccine-derived poliovirus — and the strategies employed globally to eliminate both. It describes how Pakistan's efforts are monitored internationally and how the country reports to global bodies.</p>
<p>For visitors seeking to understand why ending polio in Pakistan matters not just for Pakistani children but for children around the world, this page provides essential context and perspective.</p>`

  return (
    <PolioInfoPage
      title="Global Polio – Pakistan | End Polio Pakistan"
      path="/global-polio-pakistan"
      contentHtml={content}
      metrics={[
        { label: "Resource Name", value: "Global Polio – Pakis..." },
        { label: "Source", value: "NEOC Pakistan" },
        { label: "Help Hotline", value: "1166" },
        { label: "Status", value: "Verified Info" }
      ]}
    />
  )
}
