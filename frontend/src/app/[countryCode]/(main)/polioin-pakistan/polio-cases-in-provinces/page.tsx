import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Polio Cases in Pakistan till 2026 All Provinces",
  description: "Explore polio cases across all provinces of Pakistan (Sindh, Punjab, KP, Balochistan, GB, AJK). Analysis of historical peaks, low points, and current 2026 trends.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/polio-cases-in-provinces",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const provinces = [
    {
      name: "Khyber Pakhtunkhwa (KP)",
      cases: "214 Cases",
      desc: "Nearly half of all cases in Pakistan occur in KP. Mountainous terrains, tribal border areas, and security issues complicate vaccination outreach, leaving thousands of children missed.",
      badgeColor: "bg-red-50 text-red-750 border-red-100"
    },
    {
      name: "Sindh",
      cases: "104 Cases",
      desc: "Karachi's dense informal settlements are major transmission engine rooms. Poor sanitation and contaminated water speed virus spread; Sindh recorded 23 cases in 2024.",
      badgeColor: "bg-amber-50 text-amber-750 border-amber-100"
    },
    {
      name: "Balochistan",
      cases: "81 Cases",
      desc: "Balochistan faces persistent transmission risks due to low immunization network density and high migration flows along the border with Afghanistan. Had 27 cases in 2024.",
      badgeColor: "bg-orange-50 text-orange-750 border-orange-100"
    },
    {
      name: "Punjab",
      cases: "31 Cases",
      desc: "Case counts remain low but persistent in bad years (12 in 2019 and 14 in 2020), primarily in urban slums like Lahore and south Punjab districts.",
      badgeColor: "bg-blue-50 text-blue-750 border-blue-100"
    },
    {
      name: "GB, AJK & Islamabad",
      cases: "2-3 Cases",
      desc: "Smaller populations, better hygiene, and stronger healthcare access keep these regions mostly safe, though importation from endemic zones remains a threat.",
      badgeColor: "bg-emerald-50 text-emerald-750 border-emerald-100"
    }
  ]

  const milestones = [
    {
      year: "2019",
      title: "Resurgence Peak (147 Cases)",
      desc: "The highest count in over a decade, heavily driven by vaccine refusals and campaign gaps in KPK (93 cases) and Sindh (30 cases)."
    },
    {
      year: "2021",
      title: "Historic Low (1 Case)",
      desc: "A single case countrywide proved that highly-coordinated door-to-door immunization campaigns could achieve complete eradication."
    },
    {
      year: "2024",
      title: "Post-COVID Comeback (74 Cases)",
      desc: "Campaign interruptions during COVID lockdowns left a massive cohort of newborns completely unvaccinated, fueling a rapid multi-province resurgence."
    },
    {
      year: "2025",
      title: "Renewed Strategy (31 Cases)",
      desc: "Cases dropped by over 50% following five intensive nationwide door-to-door immunization sweeps, though sewage samples continue to show virus activity."
    },
    {
      year: "2026",
      title: "Ongoing Fight (3 Cases)",
      desc: "Three confirmed cases recorded in Sujawal, Bannu, and North Waziristan. Active environmental surveillance and weekly sweeps continue."
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
            <Link href="/polioin-pakistan" className="hover:text-primary transition">Polio in Pakistan</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Provincial Statistics</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              Polio Cases in Pakistan across Provinces
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              An analytical breakdown of wild poliovirus transmission dynamics and historical indicators across Pakistan's provinces and territories from 2015 to 2026.
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Context (65%) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Intro */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900">
                Poliovirus Transmission in Pakistan
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pakistan remains one of only two polio-endemic nations globally. While vaccination campaigns 
                have successfully contained the virus to specific geographic belts, regional challenges, sanitation gaps, 
                and population movement cause cases to reappear across provincial boundaries.
              </p>
            </section>

            {/* Provincial Breakdown Card List */}
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 pl-1">
                Regional Overview (2015 - 2025 Totals)
              </h2>
              <div className="space-y-3">
                {provinces.map((prov, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-gray-950 text-base">{prov.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl">{prov.desc}</p>
                    </div>
                    <div className="shrink-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${prov.badgeColor}`}>
                        {prov.cases}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline Milestones */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-gray-950">
                Key Timeline Milestones (2019 - 2026)
              </h2>
              
              <div className="space-y-6 relative pl-4 border-l-2 border-gray-150">
                {milestones.map((mil, idx) => (
                  <div key={idx} className="relative space-y-1.5">
                    {/* Circle marker */}
                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-gray-900 border border-white" />
                    <span className="text-xs font-bold text-primary block">{mil.year}</span>
                    <h5 className="font-semibold text-gray-900 text-sm">{mil.title}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-xl">{mil.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why does it persist */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950">
                Primary Eradication Obstacles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h5 className="font-bold text-gray-900 mb-1">Vaccine Hesitancy</h5>
                  <p className="text-xs text-gray-500 leading-normal">Misconceptions in marginalized communities cause some families to repeatedly refuse the vaccine drops.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h5 className="font-bold text-gray-900 mb-1">Security & Access</h5>
                  <p className="text-xs text-gray-500 leading-normal">Remote border zones and local security threats make it difficult for frontline workers to reach every child.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h5 className="font-bold text-gray-900 mb-1">Transit Migration</h5>
                  <p className="text-xs text-gray-500 leading-normal">High cross-border mobility with Afghanistan continuously imports poliovirus strains, sparking new outbreaks.</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h5 className="font-bold text-gray-900 mb-1">Sanitation & Hygiene</h5>
                  <p className="text-xs text-gray-500 leading-normal">Poor sewage infrastructure allows the virus to survive in local waterways and transmit easily through contaminated water.</p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Sidebar Navigation (35%) */}
          <div className="space-y-6">
            
            {/* View District Stats Card */}
            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm">District-Wise Stats</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Check specific city and district-wise details of poliovirus cases (WPV1 & cVDPV2) mapped across Pakistan.
              </p>
              <Link
                href="/polioin-pakistan/district-wise-polio-cases"
                className="flex items-center justify-center w-full px-4 py-2.5 bg-white text-gray-950 font-semibold text-xs rounded-lg hover:bg-gray-50 transition"
              >
                View District Cases
                <svg className="h-4 w-4 ml-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>

            {/* Environmental Surveillance Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Surveillance System</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Environmental sewage testing monitors weekly virus trends across 115 sites nationwide, serving as our primary early warning system.
              </p>
              <Link
                href="/polioin-pakistan/surveillance"
                className="inline-flex items-center text-xs font-semibold text-blue-600 hover:underline"
              >
                Learn How We Track The Virus
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
