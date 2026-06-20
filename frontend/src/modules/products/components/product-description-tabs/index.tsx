"use client"

import { useState, useEffect, useMemo } from "react"

type TabKey = "english" | "urdu" | "reviews"

type Props = {
  /** Legacy single rich-description (back-compat). */
  richDescription?: string | null
  /** English rich description from `metadata.rich_description_en`. */
  richDescriptionEn?: string | null
  /** Urdu rich description from `metadata.rich_description_ur` (RTL). */
  richDescriptionUr?: string | null
  /** Plain-text fallback when no rich content is available. */
  plainDescription?: string | null
  /** ProductReviews slot — passed as children to keep server/client clean. */
  reviewsSlot: React.ReactNode
  /** Number to render in the Reviews tab badge. */
  reviewCount?: number
}


/**
 * Tabbed panel below the product hero. When the admin has supplied an
 * Urdu translation alongside the English copy, both tabs render so
 * customers can read either:
 *
 *   [English]  [اردو]  [Reviews (12)]
 *    ─────────────────────────────
 *    Tab content...
 *
 * Tabs auto-hide when their data isn't present — e.g. a product
 * with only English copy shows just [English] and [Reviews].
 *
 * The Urdu container is wrapped with `lang="ur" dir="rtl"` so screen
 * readers and search engines correctly handle the script direction (this
 * is also a hard requirement for ranking on Urdu-language queries).
 *
 * Listens for clicks on `#reviews` anchor links (e.g. the rating link in
 * the product info) — when triggered, switches to the Reviews tab and
 * scrolls smoothly.
 */
export default function ProductDescriptionTabs({
  richDescription,
  richDescriptionEn,
  richDescriptionUr,
  plainDescription,
  reviewsSlot,
  reviewCount,
}: Props) {
  // English content priority: explicit `_en` > legacy `richDescription` >
  // plainDescription. We store all three because the legacy field may be
  // English copy from before the dual-language migration.
  const englishHtml = (richDescriptionEn ?? richDescription)?.trim() || null
  const urduHtml = richDescriptionUr?.trim() || null
  const hasEnglish = !!(englishHtml || plainDescription)
  const hasUrdu = !!urduHtml

  const initialTab: TabKey = useMemo(() => {
    if (hasEnglish) return "english"
    if (hasUrdu) return "urdu"
    return "reviews"
  }, [hasEnglish, hasUrdu])

  const [active, setActive] = useState<TabKey>(initialTab)

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#reviews") {
        setActive("reviews")
        setTimeout(() => {
          const el = document.getElementById("reviews")
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }

    if (window.location.hash === "#reviews") {
      handleHashChange()
    }
    window.addEventListener("hashchange", handleHashChange)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href="#reviews"]')
      if (link) {
        e.preventDefault()
        setActive("reviews")
        setTimeout(() => {
          const el = document.getElementById("reviews")
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
        return
      }

    }

    document.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  const tabBtnCls = (isActive: boolean) =>
    `relative px-4 py-2.5 text-sm font-semibold transition-colors ${
      isActive ? "text-primary" : "text-ink/55 hover:text-ink"
    }`

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-line" role="tablist">
        {hasEnglish && (
          <button
            role="tab"
            aria-selected={active === "english"}
            onClick={() => setActive("english")}
            className={tabBtnCls(active === "english")}
          >
            Description
            {active === "english" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
        )}

        {hasUrdu && (
          <button
            role="tab"
            aria-selected={active === "urdu"}
            onClick={() => setActive("urdu")}
            className={tabBtnCls(active === "urdu")}
            lang="ur"
          >
            اردو
            {active === "urdu" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
            )}
          </button>
        )}

        <button
          role="tab"
          aria-selected={active === "reviews"}
          onClick={() => setActive("reviews")}
          className={`${tabBtnCls(active === "reviews")} inline-flex items-center gap-1.5`}
        >
          Reviews
          {typeof reviewCount === "number" && reviewCount > 0 && (
            <span className="inline-flex items-center justify-center h-[18px] min-w-[18px] px-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
              {reviewCount}
            </span>
          )}
          {active === "reviews" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Tab panels */}
      <div className="pt-4 pb-2" role="tabpanel">
        {active === "english" && hasEnglish && (
          <div
            lang="en"
            className="prose prose-sm max-w-none text-ink/80 leading-relaxed"
          >
            <h2 className="sr-only">Product Description</h2>
            {englishHtml ? (
              <div dangerouslySetInnerHTML={{ __html: englishHtml }} />
            ) : (
              <p className="whitespace-pre-line">{plainDescription}</p>
            )}
          </div>
        )}

        {active === "urdu" && hasUrdu && (
          <div
            lang="ur"
            dir="rtl"
            className="prose prose-sm max-w-none text-ink/80 leading-loose font-[400] text-right"
          >
            <h2 className="sr-only" lang="ur">مصنوعات کی تفصیل</h2>
            <div dangerouslySetInnerHTML={{ __html: urduHtml! }} />
          </div>
        )}

        {active === "reviews" && (
          <div>
            <h2 className="sr-only">Customer Reviews</h2>
            {reviewsSlot}
          </div>
        )}
      </div>
    </div>
  )
}
