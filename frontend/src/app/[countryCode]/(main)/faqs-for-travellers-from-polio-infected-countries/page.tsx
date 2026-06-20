import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQs for Travellers from Polio-Infected Countries",
  description: "Essential travel vaccine guidelines and polio certificate FAQs for international travelers departing from Pakistan. Learn about WHO requirements and official centers.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/faqs-for-travellers-from-polio-infected-countries",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const travelFaqs = [
    {
      q: "Do I need a polio vaccination certificate?",
      a: "Yes, if you are a resident or a long-term visitor (staying for more than 4 weeks) in Pakistan and traveling internationally, you are required to hold a valid polio vaccination certificate at your departure airport."
    },
    {
      q: "Which polio vaccine do I need for travel?",
      a: "Travelers can receive either the Oral Polio Vaccine (OPV) or the Inactivated Polio Vaccine (IPV). The vaccination must be officially recorded by an authorized health worker."
    },
    {
      q: "How long before travel should I get vaccinated?",
      a: "WHO guidelines recommend receiving the polio vaccine dose between 4 weeks and 12 months before your international departure. This ensures your body has built sufficient immunity and that your certificate is fully valid for border control."
    },
    {
      q: "How long is the certificate valid?",
      a: "For international travel clearance, the polio certificate is valid for 12 months from the date of vaccination. If you travel frequently, you will need to receive a booster dose annually."
    },
    {
      q: "Where can I get vaccinated and obtain the certificate?",
      a: "Vaccinations are administered at designated government hospitals, federal health clinics, and port health centers. Once vaccinated, you can register and download your certificate online via the NIMS NADRA portal or at a NADRA e-Sahulat center."
    }
  ]

  return (
    <div className="bg-[#f9fafb] min-h-screen text-slate-800 font-sans pb-16">
      {/* Header Area */}
      <header className="bg-white border-b border-gray-200 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <nav className="flex space-x-2 text-sm text-gray-500 mb-4 items-center">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Traveler FAQs</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              FAQs for Travellers from Polio-Infected Countries
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Important immunization guidelines, compliance notices, and official certificate procedures under WHO International Health Regulations (IHR) for passengers departing Pakistan.
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Advisories (65%) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Travel compliance card */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                WHO International Travel Regulations
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  As Pakistan remains one of the last countries where wild poliovirus transmission is active, 
                  the World Health Organization (WHO) has recommended that all residents and long-term 
                  visitors (staying over 4 weeks) receive a dose of polio vaccine before leaving the country.
                </p>
                <p>
                  This regulation prevents international travelers from carrying the virus to polio-free regions, 
                  acting as a crucial shield in the global strategy to eliminate the disease once and for all.
                </p>
              </div>
            </section>

            {/* Travel FAQs */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pl-1">
                Frequently Asked Travel Queries
              </h2>
              <div className="space-y-3">
                {travelFaqs.map((faq, idx) => (
                  <details
                    key={idx}
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

            {/* Verification & Port Health Centres info */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Official Certification Process
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pakistan's Ministry of National Health Services operates specialized immunization clinics at ports of entry, 
                major airports, and municipal hospitals. Vaccines are administered under international standards, 
                and official certificates (International Certificate of Vaccination or Prophylaxis - ICVP) are generated online, 
                complying with border immigration systems worldwide.
              </p>
              <div className="pt-2">
                <Link
                  href="/certificate/vaccination-certificate"
                  className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-primary transition"
                >
                  View Step-by-Step Certificate Guide
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </div>
            </section>

          </div>

          {/* Right Column: Checklist Sidebar (35%) */}
          <div className="space-y-6">
            
            {/* Traveler Checklist Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-5">
              <h3 className="font-bold text-sm text-gray-950 uppercase tracking-wider border-b border-gray-100 pb-3">
                Pre-Flight Compliance Checklist
              </h3>
              
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Get Vaccinated</h5>
                    <p className="text-xs text-gray-500 mt-0.5">At least 4 weeks prior to departure flight.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">NIMS Online Submission</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Register database details using CNIC/Passport.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Pay Processing Fee</h5>
                    <p className="text-xs text-gray-500 mt-0.5">PKR 100 NADRA payment through credit/debit card.</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-blue-50 text-blue-600 border border-blue-100 font-bold text-xs rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Download Official PDF</h5>
                    <p className="text-xs text-gray-500 mt-0.5">Print high-quality copy to present at immigration checks.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Advisory disclaimer */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                Visa Notice
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                Traveler requirements vary dynamically by country. Verify with your airline or destination embassy at least 10 days before departure.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
