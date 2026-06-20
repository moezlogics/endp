import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Polio Vaccination Certificate by NIMS NADRA Online 2026",
  description: "Download and print your official Polio Vaccination Certificate online via NIMS NADRA in Pakistan. Complete guide on registration, login, fee payment, check, and verification for international travel.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/certificate/vaccination-certificate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const steps = [
    {
      num: "1",
      title: "Get Vaccinated & Record in Card",
      desc: "Visit your nearest government immunization center or designated polio vaccination centres for international travellers. Receive the oral polio vaccine (OPV) or inactivated polio vaccine (IPV), and make sure the health worker stamps your polio vaccination card / polio card / immunization card."
    },
    {
      num: "2",
      title: "NIMS NADRA Portal Registration",
      desc: "Access the National Immunization Management System (NIMS) portal at nims.nadra.gov.pk. Go to the nims.nadra.gov.pk registration login page, enter your CNIC/NICOP and passport number, and register your record."
    },
    {
      num: "3",
      title: "Pay Online Verification Fee",
      desc: "The official polio card fee in Pakistan is PKR 100. You can pay this online using your debit/credit card, JazzCash, EasyPaisa, or by visiting a local NADRA e-Sahulat franchise."
    },
    {
      num: "4",
      title: "Download Polio Certificate",
      desc: "Once payment is verified, proceed with the polio certificate download nadra option. You will obtain a PDF file of your government of pakistan international certificate for polio vaccination, which you can save and print."
    }
  ]

  const faqs = [
    {
      question: "How to check polio card online in Pakistan?",
      answer: "To do a polio card online check, log into the official nims.nadra.gov.pk certificate portal. Enter your CNIC number to search the national immunization database. Your complete immunization record (including COVID-19 or polio vaccination details) will be displayed. Alternatively, you can use the Pak Vaccination Pass app to view your digital immunization certificate on your phone."
    },
    {
      question: "What is the fee for the NADRA polio vaccination certificate?",
      answer: "The official fee set by the Ministry of National Health Services for the online polio vaccine certificate is PKR 100. This is a one-time fee. Once paid, you can perform a polio certificate download as many times as needed without any extra charge."
    },
    {
      question: "Is the polio certificate mandatory for Hajj/Umrah and Saudi Arabia visas?",
      answer: "Yes, travelers departing from Pakistan for Hajj or Umrah must present a valid polio vaccination certificate for umrah. Saudi Arabia requires all visitors arriving from polio-endemic countries to have received the oral polio vaccine at least 4 weeks before arrival, backed by an official nadra polio vaccination certificate."
    },
    {
      question: "How do I perform online polio certificate verification?",
      answer: "You can verify the authenticity of any digital certificate by visiting the online polio certificate verification page on the nims.nadra portal. Simply scan the QR code printed on the top-right of your certificate or enter the 13-digit certificate number to run a direct nadra polio verification check."
    },
    {
      question: "Where are the official vaccination centers located in major cities?",
      answer: "Authorized polio vaccination centres near me include all major government hospitals (like Services Hospital in Lahore or designated clinics in Karachi, Islamabad, and Rawalpindi). You can get vaccinated and receive an official stamp on your polio vaccination card directly at these centers."
    }
  ]

  return (
    <div className="bg-[#f8f9fa] text-gray-800 min-h-screen font-sans antialiased">
      {/* Minimal Google-style Top Header Area */}
      <header className="bg-white border-b border-gray-200 py-10 md:py-16">
        <div className="container-anvogue mx-auto px-4 max-w-4xl text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="ph ph-info text-sm" /> Official Traveler Guide
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Polio Vaccination Certificate by NIMS NADRA Online 2026
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-3 max-w-3xl leading-relaxed">
            Detailed step-by-step instructions to register your immunization records, pay the official fee, and proceed with the <strong>polio certificate download</strong> via the National Immunization Management System (NIMS).
          </p>
        </div>
      </header>

      {/* Main Responsive Grid Layout */}
      <main className="container-anvogue mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Left Column: Documentation Guide & Content */}
          <div className="space-y-10">
            
            {/* Overview Section */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3.5">
                Overview of Polio Certificate in Pakistan
              </h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                The **polio certificate** (or **polio vaccination certificate**) is a mandatory requirement for all international travelers leaving Pakistan. Under the IHR guidelines of the World Who Organization, travelers must carry proof of polio vaccination to prevent the transit of wild poliovirus.
              </p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4">
                The **Ministry of National Health Services** manages the database through the **National Immunization Management System (NIMS)**. NADRA digitizes this data, enabling citizens, expatriates, and travelers to obtain an **online polio certificate** linked directly to their passport.
              </p>
              
              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 mt-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">Official Portal</span>
                  <a href="https://nims.nadra.gov.pk" target="_blank" rel="noopener noreferrer nofollow" className="text-xs font-semibold text-blue-600 hover:underline mt-1 block">
                    nims.nadra.gov.pk
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">Certificate Fee</span>
                  <span className="text-xs font-semibold text-gray-900 mt-1 block">PKR 100 (One-time)</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">Validity</span>
                  <span className="text-xs font-semibold text-green-700 mt-1 block">Lifetime Validity</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 block">Requirement</span>
                  <span className="text-xs font-semibold text-gray-900 mt-1 block">All international flights</span>
                </div>
              </div>
            </section>

            {/* How to Apply Step Timeline */}
            <section className="space-y-6">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Steps to Obtain Polio Certificate Online
              </h2>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4 items-start shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm md:text-base text-gray-900">{step.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saudi / Visa Travel Box */}
            <section className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 md:p-6">
              <h3 className="font-semibold text-sm md:text-base text-blue-900 mb-2 flex items-center gap-1.5">
                <i className="ph ph-airplane-tilt text-blue-700" />
                Umrah and Saudi Arabia Visa Guidelines
              </h3>
              <p className="text-xs md:text-sm text-blue-800/90 leading-relaxed">
                If you are travelling from Pakistan for **Umrah** or Hajj, you must have a valid **polio vaccination certificate for umrah**. The Saudi Ministry of Health requires the **oral polio vaccine** to be administered and recorded online on the **nadra polio card** at least 4 weeks before flying. Make sure your passport number is correctly typed in the certificate to prevent issues at immigration.
              </p>
            </section>

            {/* FAQ Accordion list using native details/summary */}
            <section className="space-y-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {faqs.map((faq, index) => (
                  <details key={index} className="group border-b border-gray-200 last:border-b-0">
                    <summary className="flex items-center justify-between text-left p-5 hover:bg-gray-50 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none select-none">
                      <span className="font-semibold text-xs md:text-sm text-gray-900">{faq.question}</span>
                      <i className="ph ph-caret-down text-sm text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="p-5 pt-0 bg-gray-50/50 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Sidebar Card */}
          <aside className="space-y-6">
            
            {/* Minimal Document Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Document Preview
                </span>
                <span className="text-[9px] text-gray-400 mt-0.5 block">
                  Polio Vaccine Certificate Pakistan
                </span>
              </div>
              <div className="p-4 bg-gray-100/50 flex justify-center border-b border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://cdn.endpolio.com.pk/uploads/2026/06/nims-nadra-polio-certificate-bKSN0jfJ.webp"
                  alt="NIMS NADRA Polio Vaccination Certificate Preview"
                  className="rounded border border-gray-200 shadow-sm max-w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-250 cursor-pointer"
                />
              </div>
              <div className="p-5 space-y-4">
                <p className="text-xs text-gray-500 leading-relaxed text-center">
                  Official digital layout with a verification QR code for travel clearance.
                </p>
                
                <a
                  href="https://nims.nadra.gov.pk/nims/certificate-other"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <i className="ph ph-arrow-square-out text-sm" />
                  Apply via NIMS NADRA
                </a>
              </div>
            </div>

            {/* Quick Links list */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-3">Resources</h3>
              <ul className="text-xs space-y-2.5">
                <li>
                  <a href="https://nims.nadra.gov.pk" target="_blank" rel="noopener noreferrer nofollow" className="text-blue-600 hover:underline flex items-center gap-1.5">
                    <i className="ph ph-link text-sm" /> NIMS NADRA Website
                  </a>
                </li>
                <li>
                  <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1.5">
                    <i className="ph ph-house text-sm" /> End Polio Pakistan Home
                  </Link>
                </li>
              </ul>
            </div>

          </aside>

        </div>
      </main>
    </div>
  )
}
