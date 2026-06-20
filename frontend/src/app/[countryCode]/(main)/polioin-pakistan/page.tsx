import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Polio in Pakistan",
  description: "For over 25 years, the Pakistan Polio Eradication Programme has been fighting to eliminate the poliovirus. Driven by 260,000 frontline workers, top public health experts, and the world’s largest tracking network, the programme has successfully reduced polio cases by 99% since the 1990s.",
  alternates: {
    canonical: "https://www.endpolio.com.pk/polioin-pakistan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function Page() {
  const quickLinks = [
    {
      title: "District-Wise Cases",
      desc: "Detailed historical and current cases by district.",
      href: "/polioin-pakistan/district-wise-polio-cases"
    },
    {
      title: "Provincial Statistics",
      desc: "Distribution of poliovirus cases across provinces.",
      href: "/polioin-pakistan/polio-cases-in-provinces"
    },
    {
      title: "Surveillance Program",
      desc: "How sewage testing tracks silent virus transmission.",
      href: "/polioin-pakistan/surveillance"
    },
    {
      title: "High-Risk Areas",
      desc: "Detailed tiers and Super High-Risk Union Councils.",
      href: "/polioin-pakistan/high-risk-area"
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
            <span className="text-gray-900 font-medium">Polio in Pakistan</span>
          </nav>
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              Polio in Pakistan
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-3 max-w-2xl leading-relaxed">
              For over 25 years, the Pakistan Polio Eradication Programme has fought to eliminate the poliovirus, powered by 260,000 frontline workers, public health experts, and the world’s largest surveillance network.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Cases Reduced</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">&gt; 99%</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Since the 1990s</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Frontline Force</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">260,000+</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Vaccination workers</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Active Labs</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">2 WHO Labs</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">World-class analysis</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">National Mission</span>
              <h4 className="text-xl font-bold text-gray-900 mt-1">100% Free</h4>
              <p className="text-[10px] text-gray-500 mt-0.5">Vaccines for every child</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Context (65%) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* What is polio */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950 flex items-center gap-2">
                What is Polio?
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Polio is a highly contagious virus that mainly affects young children. The virus attacks the nervous system and can cause permanent, lifelong paralysis in a matter of hours.
              </p>
              
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong>Transmission:</strong> It spreads from person to person through contaminated water, food, or poor community sanitation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong>Symptoms:</strong> Early signs include fever, fatigue, headaches, vomiting, stiffness in the neck, and pain in the limbs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span><strong>Prevention:</strong> Polio has no cure. It can only be prevented through repeated doses of the oral polio vaccine.</span>
                </li>
              </ul>
            </section>

            {/* Our mission */}
            <section className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-950">
                Our Mission & Actions
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                With Pakistan and Afghanistan being the last remaining areas with active wild poliovirus reservoirs, our mission is to make Pakistan 100% polio-free. To achieve this, the programme:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-1">Immunization campaigns</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Conducts nationwide door-to-door vaccination campaigns to protect every child under age five.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-1">Surveillance Testing</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Uses sensitive sewage testing and laboratory networks to track and stop the virus quickly.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-150">
                  <h4 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-1">Social Awareness</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Builds community awareness to answer vaccine hesitancy and encourage families to vaccinate.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column: Navigation Sidebar (35%) */}
          <div className="space-y-6">
            
            {/* Quick Links Group */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2.5">
                Detailed Surveillance & Stats
              </h3>
              
              <div className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50/50 hover:border-gray-300 transition group"
                  >
                    <h5 className="font-semibold text-gray-900 text-sm group-hover:text-primary transition">
                      {link.title}
                    </h5>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">
                      {link.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Helpline Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-950 text-sm flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Sehat Tahaffuz Helpline
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Call the official national hotline to report missed vaccination teams, request booster schedules, or get verified medical answers.
              </p>
              <a
                href="tel:1166"
                className="block text-center py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition"
              >
                Dial Toll-Free: 1166
              </a>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}
