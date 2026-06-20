import React from "react"
import Link from "next/link"

interface Metric {
  label: string;
  value: string;
  desc?: string;
}

interface PolioInfoPageProps {
  title: string;
  path: string;
  contentHtml: string;
  metrics?: Metric[];
  sidebarContent?: React.ReactNode;
  dir?: "ltr" | "rtl";
}

export default function PolioInfoPage({
  title,
  path,
  contentHtml,
  metrics,
  sidebarContent,
  dir = "ltr"
}: PolioInfoPageProps) {
  // Parse breadcrumbs from path (e.g. "/polioin-pakistan/surveillance" -> ["polioin-pakistan", "surveillance"])
  const pathSegments = path.split("/").filter(Boolean)
  const isRtl = dir === "rtl"

  return (
    <div dir={dir} className={`bg-[#f9fafb] min-h-screen text-slate-800 font-sans pb-16 ${isRtl ? "text-right" : "text-left"}`}>
      {/* 1. Hero Header Area */}
      <header className="bg-white border-b border-gray-200 py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className={`flex space-x-2 text-xs sm:text-sm text-gray-500 mb-4 items-center ${isRtl ? "flex-row-reverse space-x-reverse" : ""}`}>
            <Link href="/" className="hover:text-primary transition">
              {isRtl ? "ہوم" : "Home"}
            </Link>
            {pathSegments.map((segment, idx) => {
              const href = "/" + pathSegments.slice(0, idx + 1).join("/")
              const isLast = idx === pathSegments.length - 1
              const displayName = segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())

              return (
                <React.Fragment key={idx}>
                  <span>/</span>
                  {isLast ? (
                    <span className="text-gray-900 font-medium">{displayName}</span>
                  ) : (
                    <Link href={href} className="hover:text-primary transition">
                      {displayName}
                    </Link>
                  )}
                </React.Fragment>
              )
            })}
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-gray-950 leading-tight">
              {title}
            </h1>
          </div>

          {/* Metrics row (Optional) */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {metrics.map((m, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">
                    {m.label}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mt-1">
                    {m.value}
                  </h4>
                  {m.desc && (
                    <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                      {m.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 2. Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Card (65% width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
              <div 
                className={`prose prose-sm md:prose-base max-w-none text-slate-600 leading-relaxed 
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-lg prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                  prose-a:text-blue-600 prose-a:font-semibold hover:prose-a:underline
                  prose-ul:list-disc prose-ul:mb-6 prose-ul:space-y-2
                  ${isRtl ? "prose-ul:pr-6 prose-ul:pl-0" : "prose-ul:pl-6 prose-ul:pr-0"}
                  prose-p:mb-6
                  prose-table:border-collapse prose-table:w-full prose-table:my-6
                  prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2.5 prose-th:font-semibold prose-th:text-gray-900 prose-th:border-b prose-th:border-gray-200
                  prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-150 prose-td:text-gray-600 ${isRtl ? "prose-rtl text-right" : ""}`}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            </div>
          </div>

          {/* Sidebar Area (35% width) */}
          <div className="space-y-6">
            {/* Custom Sidebar Content (If provided) */}
            {sidebarContent}

            {/* Default Quick Help Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-950 text-sm flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Sehat Tahaffuz Helpline
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Contact the national emergency operations center helpline for support, vaccine verification, or to report missed vaccination teams in your area.
              </p>
              <a
                href="tel:1166"
                className="block text-center py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold transition"
              >
                Dial Toll-Free: 1166
              </a>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-gray-950 text-xs uppercase tracking-wider">
                Quick Explorer
              </h4>
              <div className="flex flex-col space-y-2 text-xs">
                <Link
                  href="/polioin-pakistan/district-wise-polio-cases"
                  className="text-blue-600 hover:underline"
                >
                  District-Wise Cases Tracker
                </Link>
                <Link
                  href="/certificate/vaccination-certificate"
                  className="text-blue-600 hover:underline"
                >
                  NADRA Polio Certificate Guide
                </Link>
                <Link
                  href="/faqs"
                  className="text-blue-600 hover:underline"
                >
                  Frequently Asked Questions (FAQs)
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
