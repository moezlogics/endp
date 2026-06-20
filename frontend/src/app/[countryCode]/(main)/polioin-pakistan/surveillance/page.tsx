import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Polio Surveillance in Pakistan - sewage monitoring",
  description: "Learn how the Pakistan Polio Eradication Programme tracks poliovirus. Details on environmental sewage monitoring, WHO laboratories, and high-risk core reservoirs.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/surveillance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const highRiskCities = [
    { region: "Sindh", cities: ["Karachi", "Hyderabad"] },
    { region: "Punjab", cities: ["Rawalpindi", "Lahore"] },
    { region: "Khyber Pakhtunkhwa (KP)", cities: ["Peshawar", "Mardan", "Bannu", "D.I. Khan", "Swabi", "Kohat", "Abbottabad"] },
    { region: "Balochistan", cities: ["Quetta", "Pishin", "Killa Abdullah", "Loralai", "Sibi"] },
    { region: "Gilgit-Baltistan", cities: ["Skardu"] },
    { region: "Azad Jammu & Kashmir (AJK)", cities: ["Muzaffarabad"] }
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
            <span className="text-gray-900 font-medium">Surveillance</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              Polio Surveillance in Pakistan
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Tracking the poliovirus through environmental sewage testing, advanced genetic analysis, and active clinical surveillance across a nationwide network.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Sampling Sites</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">115 Sites</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Across Pakistan</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Monitored Cities</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">53 Cities</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Active weekly testing</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Core Reservoirs</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">18 Cities</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">High-priority targets</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">WHO Laboratories</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">2 Labs</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">High-security genome typing</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Context (65%) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Environmental Sewage Testing */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950">
                1. Sewage Testing & Early Warning
              </h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                <p>
                  To stop polio, the programme doesn't just wait for children to show symptoms. Wastewater 
                  samples are systematically collected from designated open sewage channels in major cities and 
                  analyzed at our state-of-the-art laboratories.
                </p>
                <p>
                  If poliovirus genetic material is found in a sample, it serves as an early warning that the 
                  virus is silently circulating in the community. This allows local health departments to deploy 
                  vaccinators immediately, creating a wall of immunity before clinical paralysis cases can emerge.
                </p>
              </div>
            </section>

            {/* Laboratory Analysis */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950">
                2. World-Class WHO Laboratories
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pakistan has established two high-level polio reference laboratories certified directly by the 
                World Health Organization. These facilities conduct molecular sequencing to determine the exact strain 
                active in each area (Wild Polio Type 1, cVDPV1, cVDPV2).
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-150 text-xs text-gray-500 leading-relaxed">
                By tracking genetic signatures, scientists can map the virus's movement patterns and link 
                environmental detections to specific geographic locations or cross-border travel corridors.
              </div>
            </section>

            {/* 18 High-Risk Reservoir Cities Grid */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-950">
                  3. The 18 Core Reservoir Cities
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Surveillance data has pinpointed 18 high-risk cities where transmission is most resilient. 
                  These areas receive priority resource allocation during vaccination campaigns.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highRiskCities.map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                    <h5 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-2">
                      {item.region}
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {item.cities.map((city) => (
                        <span
                          key={city}
                          className="px-2 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded font-medium shadow-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Actions Sidebar (35%) */}
          <div className="space-y-6">
            
            {/* View Stats Card */}
            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm">Case Tracking</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Check the latest validated statistics and district-wise case breakdowns across Pakistan.
              </p>
              <Link
                href="/polioin-pakistan/district-wise-polio-cases"
                className="flex items-center justify-center w-full px-4 py-2.5 bg-white text-gray-950 font-semibold text-xs rounded-lg hover:bg-gray-50 transition"
              >
                View District-Wise Cases
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </div>

            {/* General Advice */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Early Action</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Environmental monitoring shows that the virus can travel quickly through major transit corridors. 
                Always ensure your children are vaccinated during every door-to-door campaign.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
