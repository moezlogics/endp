import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "High-Risk Area - Polio Risk Tiers in Pakistan",
  description: "Understanding the 4 District Risk Tiers (Tier 1-4) and Super High-Risk Union Councils (SHRUCs) in Pakistan. Clean tabular data showing district risks.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan/high-risk-area",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const tiersData = [
    { province: "AJK", t1: 0, t2: 0, t3: 0, t4: 10, total: 10 },
    { province: "Balochistan", t1: 3, t2: 4, t3: 10, t4: 16, total: 33 },
    { province: "Gilgit Baltistan", t1: 0, t2: 0, t3: 2, t4: 8, total: 10 },
    { province: "Islamabad", t1: 0, t2: 0, t3: 1, t4: 0, total: 1 },
    { province: "Khyber Pakhtunkhwa", t1: 2, t2: 16, t3: 10, t4: 6, total: 34 },
    { province: "Punjab", t1: 0, t2: 4, t3: 6, t4: 26, total: 36 },
    { province: "Sindh", t1: 6, t2: 10, t3: 8, t4: 5, total: 29 }
  ]

  const shrucsData = [
    { province: "Khyber Pakhtunkhwa", district: "Peshawar", count: 18 },
    { province: "Sindh", district: "Karachi", count: 8 },
    { province: "Balochistan", district: "Killa Abdullah", count: 5 },
    { province: "Balochistan", district: "Pishin", count: 3 },
    { province: "Balochistan", district: "Quetta", count: 6 }
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
            <span className="text-gray-900 font-medium">High-Risk Area Tiers</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              High-Risk Polio Areas in Pakistan
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              Systematic classification of districts into four epidemiological tiers and targeted focus on Super High-Risk Union Councils (SHRUCs).
            </p>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Tables & Tiers (65%) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tiers Explanation Card */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-gray-950">
                Understanding the 4 District Risk Tiers
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The National Emergency Operations Centre categorizes Pakistan's 153 districts into four distinct levels (Tiers). This tiered mapping optimizes vaccination resources and operational strategies depending on the virus presence:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100/50">
                  <h4 className="font-bold text-red-950">Tier 1 (Core Reservoir)</h4>
                  <p className="text-xs text-red-800/80 mt-1 leading-normal">
                    Districts where wild poliovirus transmission has been active for over 18 months, regularly exporting the virus to other areas.
                  </p>
                </div>
                <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-100/50">
                  <h4 className="font-bold text-amber-950">Tier 2 (High-Risk)</h4>
                  <p className="text-xs text-amber-800/80 mt-1 leading-normal">
                    Districts that border core reservoirs or show frequent environmental positive wastewater samples.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h4 className="font-bold text-gray-900">Tier 3 (Vulnerable)</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">
                    Districts with moderate risk due to vaccination coverage gaps or high mobile transit populations.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h4 className="font-bold text-gray-900">Tier 4 (Low-Risk)</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">
                    Districts with high population immunity and no environmental or clinical detections for consecutive years.
                  </p>
                </div>
              </div>
            </section>

            {/* Table 1: Tiers Distribution */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-base font-bold text-gray-900">
                  District Risk Tiers Distribution by Province
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Breakdown of all 153 districts in Pakistan by risk classification tier
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Province / Region</th>
                      <th className="px-4 py-4 text-center">Tier-1</th>
                      <th className="px-4 py-4 text-center">Tier-2</th>
                      <th className="px-4 py-4 text-center">Tier-3</th>
                      <th className="px-4 py-4 text-center">Tier-4</th>
                      <th className="px-6 py-4 text-right">Total Districts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {tiersData.map((row) => (
                      <tr key={row.province} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-3.5 font-semibold text-gray-900">
                          {row.province}
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600 font-medium">
                          {row.t1 > 0 ? (
                            <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 rounded font-semibold text-xs">{row.t1}</span>
                          ) : row.t1}
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600 font-medium">
                          {row.t2 > 0 ? (
                            <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold text-xs">{row.t2}</span>
                          ) : row.t2}
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600">
                          {row.t3}
                        </td>
                        <td className="px-4 py-3.5 text-center text-gray-600">
                          {row.t4}
                        </td>
                        <td className="px-6 py-3.5 text-right font-semibold text-gray-900">
                          {row.total}
                        </td>
                      </tr>
                    ))}
                    {/* Summary Footer */}
                    <tr className="bg-gray-50 font-bold border-t border-gray-200">
                      <td className="px-6 py-4 text-gray-900 text-xs uppercase tracking-wider">
                        Grand Total
                      </td>
                      <td className="px-4 py-4 text-center text-red-700">11</td>
                      <td className="px-4 py-4 text-center text-amber-700">34</td>
                      <td className="px-4 py-4 text-center text-gray-700">37</td>
                      <td className="px-4 py-4 text-center text-gray-700">71</td>
                      <td className="px-6 py-4 text-right text-gray-950">153</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SHRUCs Section */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950">
                Super High-Risk Union Councils (SHRUCs)
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Within Tier 1 core reservoirs, specific neighborhoods or Union Councils are categorized as Super High-Risk Union Councils (SHRUCs). These areas are highly congested, experience high population density and transit flows, suffer from poor drainage infrastructure, and hold the largest pools of vaccine-hesitant families.
              </p>
              <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-xs text-blue-800/80 leading-relaxed">
                The National Programme places a <strong>laser focus</strong> on these 40 specific SHRUCs to interrupt wild poliovirus transmission entirely.
              </div>
            </section>

            {/* Table 2: SHRUCs Breakdown */}
            <section className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-base font-bold text-gray-900">
                  Super High-Risk Union Councils (SHRUCs) by District
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Distribution of the 40 high-priority neighborhoods across districts
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Province</th>
                      <th className="px-6 py-4">District</th>
                      <th className="px-6 py-4 text-right">Number of SHRUCs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {shrucsData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">
                          {row.province}
                        </td>
                        <td className="px-6 py-3.5 font-semibold text-gray-900">
                          {row.district}
                        </td>
                        <td className="px-6 py-3.5 text-right font-bold text-red-700">
                          {row.count}
                        </td>
                      </tr>
                    ))}
                    {/* Summary Footer */}
                    <tr className="bg-gray-50 font-bold border-t border-gray-200">
                      <td className="px-6 py-4 text-gray-900 text-xs uppercase tracking-wider" colSpan={2}>
                        Total SHRUCs
                      </td>
                      <td className="px-6 py-4 text-right text-red-800 text-base">
                        40
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>

          {/* Right Column: Actions Sidebar (35%) */}
          <div className="space-y-6">
            
            {/* View District Stats Card */}
            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm">District-Wise Stats</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Check specific city and district-wise details of polio cases (WPV1 & cVDPV2) mapped across Pakistan.
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
              <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">Environmental Surveillance</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our network of 115 sewage collection points provides vital early alerts that direct local strategies.
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
