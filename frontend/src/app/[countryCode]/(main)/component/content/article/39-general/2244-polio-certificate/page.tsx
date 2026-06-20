import React from "react"
import Link from "next/link"

export const metadata = {
  title: "Online Polio Certificate Registration & Verification - NIMS NADRA",
  description: "Apply and download your official NIMS NADRA polio vaccination certificate online for international travel. Step-by-step guide on fee payment and verification.",
}

export default function Page() {
  const steps = [
    {
      num: "1",
      title: "Receive Polio Vaccine & Stamp Card",
      desc: "Visit an authorized public health facility or port immunization clinic to receive your oral or inactivated polio vaccine. Ensure the stamp is updated on your official immunization card."
    },
    {
      num: "2",
      title: "Register on NIMS NADRA Portal",
      desc: "Go to nims.nadra.gov.pk, key in your CNIC/Passport details, and register your polio vaccination records in the national database."
    },
    {
      num: "3",
      title: "Pay PKR 100 Process Fee",
      desc: "Process your application fee (PKR 100) online using JazzCash, EasyPaisa, or credit/debit card."
    },
    {
      num: "4",
      title: "Download Travel Certificate",
      desc: "Upon verification, print the PDF copy of your International Certificate of Vaccination or Prophylaxis (ICVP) for international border checks."
    }
  ]

  return (
    <div className="bg-[#f9fafb] min-h-screen text-slate-800 font-sans pb-16">
      {/* Header Banner */}
      <header className="bg-white border-b border-gray-200 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <nav className="flex space-x-2 text-sm text-gray-500 mb-4 items-center">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Polio Certificate Guide</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              Online Polio Certificate Registration & Verification
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Step-by-step advisory for passengers departing Pakistan to verify their immunization records and download their digital polio card.
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
                Poliovirus Travel Advisory & Rules
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  To secure your international visa and comply with WHO border recommendations, all citizens 
                  leaving Pakistan must hold an official **polio vaccination certificate**.
                </p>
                <p>
                  The digital certificate verifies that you have received the required vaccine dosage, 
                  shielding you and the destination countries from potential poliovirus transmission chains.
                </p>
              </div>
            </section>

            {/* Travel Steps */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pl-1">
                Steps to Obtain Polio Card
              </h2>
              <div className="space-y-3">
                {steps.map((step, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4 items-start shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm text-gray-900">{step.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sidebar Map & Actions (35%) */}
          <div className="space-y-6">
            
            {/* Certificate Preview Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Document Preview
                </span>
              </div>
              <div className="p-4 bg-gray-150/30 flex justify-center border-b border-gray-200">
                <img
                  src="https://cdn.endpolio.com.pk/uploads/2026/06/nims-nadra-polio-certificate-bKSN0jfJ.webp"
                  alt="NIMS NADRA Polio Vaccination Certificate Preview"
                  className="rounded border border-gray-200 shadow-sm max-w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <a
                  href="https://nims.nadra.gov.pk"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition"
                >
                  Apply via NIMS NADRA
                </a>
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Need Support?</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                If your vaccination record is not visible or passport data is incorrect, call the national helpline.
              </p>
              <a
                href="tel:1166"
                className="block text-center py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Helpline: 1166
              </a>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
