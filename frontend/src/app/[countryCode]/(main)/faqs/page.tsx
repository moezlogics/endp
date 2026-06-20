import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Polio",
  description: "Get answers to frequently asked questions about polio, the polio vaccine, and the Pakistan Polio Eradication Programme. Learn how to protect your child.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/faqs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const categories = [
    {
      title: "General Information About Polio",
      faqs: [
        {
          q: "What is Polio?",
          a: "Polio (short for poliomyelitis) is a highly infectious disease caused by a virus. It mostly attacks children under the age of five. The virus invades the nervous system and can cause permanent paralysis (inability to move limbs) or even death."
        },
        {
          q: "What are the symptoms of polio?",
          a: "The initial symptoms include fever, fatigue, headache, vomiting, stiffness in the neck, and pain in the limbs. In a small number of cases, it causes permanent paralysis, usually in the legs."
        },
        {
          q: "Is there a cure for polio?",
          a: "No, there is no cure for polio. It can only be prevented. Once a child is paralyzed by polio, the damage is lifelong. The only way to protect children is through repeated vaccination."
        }
      ]
    },
    {
      title: "Questions About the Vaccine",
      faqs: [
        {
          q: "Is the polio vaccine safe for children?",
          a: "Yes, the Oral Polio Vaccine (OPV) is completely safe and effective. It has been approved by global health experts and Islamic scholars worldwide. It does not cause any harm, even if a child receives it multiple times."
        },
        {
          q: "Why do children need to be vaccinated repeatedly?",
          a: "Every time a child receives the polio vaccine, their immunity against the virus grows stronger. Multiple doses are necessary to fully protect a child and to stop the virus from spreading inside the community."
        },
        {
          q: "Can a sick or newborn child receive the polio drops?",
          a: "Yes! Newborn babies and sick children actually need the vaccine even more because their immune systems are weak, making them highly vulnerable to the virus. It is completely safe to vaccinate them."
        }
      ]
    },
    {
      title: "Questions About the Eradication Programme",
      faqs: [
        {
          q: "Why is Pakistan still vaccinating when most of the world is polio-free?",
          a: "Pakistan and Afghanistan are the last two countries where the wild poliovirus still survives. Until the virus is 100% eliminated here, every child in Pakistan remains at risk of catching the disease and becoming paralyzed."
        },
        {
          q: "How does the virus spread?",
          a: "The virus enters the body through the mouth, usually when a child consumes food or water contaminated with the stool (feces) of an infected person. Poor sanitation and hygiene help the virus spread rapidly."
        },
        {
          q: "What should I do if the polio teams miss my house?",
          a: "If vaccination teams miss your home during a campaign, you should immediately call the government's free Sehat Tahhafuz Helpline at 1166 to report it so a team can be sent to your doorstep."
        }
      ]
    }
  ]

  return (
    <div className="bg-[#f9fafb] min-h-screen text-slate-800 font-sans pb-16">
      {/* Header Area */}
      <header className="bg-white border-b border-gray-200 py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-left">
          <nav className="flex space-x-2 text-sm text-gray-500 mb-4 items-center">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">FAQs</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
            Frequently Asked Questions About Polio
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
            Find official information and expert answers to common queries regarding the poliovirus, immunization campaigns, safety protocols, and vaccine effectiveness in Pakistan.
          </p>
        </div>
      </header>

      {/* Accordions */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
        {categories.map((cat, catIdx) => (
          <section key={catIdx} className="space-y-4">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-1">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.faqs.map((faq, faqIdx) => (
                <details
                  key={faqIdx}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between p-5 font-semibold text-gray-950 cursor-pointer hover:bg-gray-50/40 select-none list-none">
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <span className="text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/10">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* Footer Helpline Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 text-base">Have more questions?</h3>
            <p className="text-xs text-gray-500 mt-1 leading-normal max-w-md">
              Speak directly with health specialists at the official Sehat Tahaffuz Helpline by dialing <strong>1166</strong>. The service is free and available nationwide.
            </p>
          </div>
          <a
            href="tel:1166"
            className="px-5 py-2.5 bg-gray-900 text-white font-semibold text-sm rounded-lg hover:bg-gray-800 transition shadow-sm text-center min-w-[140px]"
          >
            Call 1166
          </a>
        </div>
      </main>
    </div>
  )
}
