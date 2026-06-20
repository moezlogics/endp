import { Suspense } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import SortDropdown from "@modules/store/components/sort-dropdown"
import ActiveFilters from "@modules/store/components/active-filters"
import ShopFilters from "@modules/store/components/shop-filters"
import MobileFilterDrawer from "@modules/store/components/mobile-filter-drawer"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"
import { listBrands } from "@lib/data/brands"
import { getActiveFilters } from "@lib/data/active-filters"
import { listProducts } from "@lib/data/products"
import { sdk } from "@lib/config"
import PaginatedProducts from "./paginated-products"

type Props = {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
  /** When rendered from a category landing page. */
  categoryId?: string
  /**
   * Category id + every descendant id (parent archive roll-up). When
   * present this drives the product query so a parent category shows
   * sub-category products too. Falls back to `[categoryId]`.
   */
  categoryIds?: string[]
  /** When rendered from a collection landing page. */
  collectionId?: string
  /**
   * When rendered from a brand landing page — the set of product IDs
   * linked to that brand. Passed straight through to PaginatedProducts
   * so the grid only shows products belonging to the brand.
   */
  productsIds?: string[]
  currentCategoryHandle?: string
  currentCategoryName?: string
  /** Page header — overridden for categories / collections. */
  title?: string
  /** Breadcrumb trail override. */
  breadcrumbs?: Array<{ label: string; href?: string }>
  /** Custom children to render below title (e.g. category carousels) */
  children?: React.ReactNode
  searchParams?: Record<string, any>
}

/**
 * Shop / archive template — Shopify-premium layout:
 *   [Breadcrumb]
 *   [Title]                                    [Sort ▾]
 *   ────────────────────────────────────────────────────
 *   [Filter Sidebar]  |  [Chips]  [Count]
 *                     |  [Product grid]
 *                     |  [Pagination]
 *
 * On mobile, the sidebar collapses into a "Filters" pill that opens a
 * slide-in drawer.
 */
const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  minPrice,
  maxPrice,
  inStock,
  categoryId,
  categoryIds,
  collectionId,
  productsIds,
  currentCategoryHandle,
  currentCategoryName,
  title,
  breadcrumbs,
  children,
  searchParams,
}: Props) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Category product query rolls up descendants when available.
  const effectiveCategoryIds =
    categoryIds && categoryIds.length
      ? categoryIds
      : categoryId
      ? [categoryId]
      : undefined

  const [categories, brands, active] = await Promise.all([
    listCategories().catch(() => []),
    listBrands().catch(() => []),
    // "Hybrid" mode — only meaningful when we're scoped to a brand
    // or category. /store sends neither and the helper short-circuits
    // to empty arrays, which the sidebar reads as "show everything".
    getActiveFilters({
      categoryId,
      productIds: productsIds,
    }).catch(() => ({ category_ids: [], brand_ids: [] })),
  ])

  const specFilters: any[] = []

  // Pass the full brand list (including parent_id) so ShopFilters
  // can render the brand tree itself.
  const brandItems = (brands || [])
    .filter((b: any) => b.is_active)
    .map((b: any) => ({
      id: b.id,
      name: b.name,
      handle: b.handle,
      logo_url: b.logo_url || null,
      parent_id: (b as any).parent_id ?? null,
      sort_order: b.sort_order ?? 0,
    }))

  // When the sidebar is scoped, narrow the visible lists to only the
  // IDs that actually contain products in scope. If a sub-brand or
  // child category is active, we ALSO include its ancestors so the
  // tree expands correctly to that leaf.
  const activeBrandIds = active.brand_ids.length
    ? expandAncestors(active.brand_ids, brandItems)
    : undefined
  const activeCategoryIds = active.category_ids.length
    ? expandCategoryAncestors(active.category_ids, categories as any[])
    : undefined

  const activeCategoryObj = currentCategoryHandle
    ? (categories || []).find((c: any) => c.handle === currentCategoryHandle)
    : null

  const hasSubcategories = currentCategoryHandle
    ? !!(activeCategoryObj?.category_children && activeCategoryObj.category_children.length > 0)
    : true

  const crumbs =
    breadcrumbs ||
    [
      { label: "Home", href: "/" },
      { label: title || "Shop" },
    ]

  return (
    <div className="container-anvogue pt-2 pb-6" data-testid="category-container">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-3 flex-wrap">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <span key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <LocalizedClientLink
                  href={c.href}
                  className="text-[12px] text-ink/55 hover:text-primary transition-colors"
                >
                  {c.label}
                </LocalizedClientLink>
              ) : (
                <span className="text-[12px] text-ink font-medium">{c.label}</span>
              )}
              {!last && <i className="ph ph-caret-right text-[10px] text-ink/40" aria-hidden />}
            </span>
          )
        })}
      </nav>

      {/* Title */}
      <div className="flex flex-wrap items-end justify-between gap-3 pb-4 border-b border-line mb-4">
        <h1
          className="text-2xl md:text-3xl font-semibold tracking-tight text-ink"
          data-testid="store-page-title"
        >
          {title || "All Products"}
        </h1>
        <div className="flex items-center gap-2">
          {hasSubcategories && (
            <MobileFilterDrawer
              categories={categories}
              currentCategory={currentCategoryHandle}
              brands={brandItems}
              activeCategoryIds={activeCategoryIds}
              activeBrandIds={activeBrandIds}
              resultCount={0 /* resolved client-side by ShopFilters summary bar */}
              specFilters={specFilters}
            />
          )}
          <SortDropdown sortBy={sort} />
        </div>
      </div>

      {children && <div className="mb-6">{children}</div>}

      {/* Body grid */}
      <div className={`grid grid-cols-1 ${hasSubcategories ? "small:grid-cols-[250px_1fr]" : ""} gap-6`}>
        {/* Desktop sidebar */}
        {hasSubcategories && (
          <aside className="hidden small:block">
            <div className="sticky top-[84px] max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar pr-1">
              <ShopFilters
                categories={categories}
                currentCategory={currentCategoryHandle}
                brands={brandItems}
                activeCategoryIds={activeCategoryIds}
                activeBrandIds={activeBrandIds}
                specFilters={specFilters}
              />
            </div>
          </aside>
        )}

        {/* Main column */}
        <div className="min-w-0">
          {/* Active filter chips row */}
          <div className="mb-3 min-h-[2rem]">
            <ActiveFilters currentCategoryName={currentCategoryName} />
          </div>

          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              categoryId={categoryId}
              categoryIds={effectiveCategoryIds}
              collectionId={collectionId}
              productsIds={productsIds}
              minPrice={minPrice}
              maxPrice={maxPrice}
              inStock={inStock === "true"}
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default StoreTemplate

/**
 * Add every parent brand of every active brand to the visible set.
 * Without this, the brand TREE in the sidebar would render a child
 * row with no parent above it (looks broken). Walking up the chain
 * to all roots keeps the tree visually intact.
 */
function expandAncestors(
  activeIds: string[],
  brands: Array<{ id: string; parent_id: string | null }>
): string[] {
  const byId = new Map(brands.map((b) => [b.id, b]))
  const out = new Set(activeIds)
  for (const id of activeIds) {
    let cur = byId.get(id)
    let guard = 0 // depth-bound for paranoid cycle safety
    while (cur?.parent_id && guard++ < 16) {
      if (out.has(cur.parent_id)) break
      out.add(cur.parent_id)
      cur = byId.get(cur.parent_id)
    }
  }
  return Array.from(out)
}

/**
 * Same idea as `expandAncestors` but for Medusa product categories.
 * Each category exposes `parent_category_id` (not `parent_id`), so
 * we can't reuse the brand helper directly.
 */
function expandCategoryAncestors(
  activeIds: string[],
  categories: Array<{ id: string; parent_category_id?: string | null }>
): string[] {
  const byId = new Map(categories.map((c) => [c.id, c]))
  const out = new Set(activeIds)
  for (const id of activeIds) {
    let cur = byId.get(id)
    let guard = 0
    while (cur?.parent_category_id && guard++ < 16) {
      if (out.has(cur.parent_category_id)) break
      out.add(cur.parent_category_id)
      cur = byId.get(cur.parent_category_id)
    }
  }
  return Array.from(out)
}
