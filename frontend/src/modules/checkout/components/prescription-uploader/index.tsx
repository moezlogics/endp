"use client"

import { setPrescriptionUrl } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { useState, useTransition } from "react"

type Props = {
  cart: HttpTypes.StoreCart
}

/**
 * Prescription uploader for the checkout page.
 *
 * Auto-detects whether any line item in the cart is flagged
 * `requires_prescription` (currently read from product metadata; this also
 * works once the backend column lands since we union both sources).
 *
 * If no item needs a prescription → renders nothing.
 * If items need one → shows an amber upload card with file picker / preview.
 *
 * Flow:
 *   1. user picks a JPG/PNG/PDF
 *   2. POST /api/prescriptions/upload → CDN returns public URL
 *   3. server action persists URL to `cart.metadata.prescription_url`
 *
 * The submit-order workflow on the backend rejects placement when this
 * URL is missing on a prescription cart, so this section is effectively a
 * checkout gate, not a polite suggestion.
 */
export default function PrescriptionUploader({ cart }: Props) {
  const requiresPrescription = (cart.items || []).some((item) => {
    const product = item.product || item.variant?.product
    const meta = (product?.metadata as any) || {}
    return (
      meta.requires_prescription === true ||
      meta.requires_prescription === "true" ||
      (product as any)?.requires_prescription === true
    )
  })
  if (!requiresPrescription) return null

  const existingUrl = (cart.metadata as any)?.prescription_url as string | null
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(existingUrl || null)

  const handleFile = async (file: File) => {
    setError(null)

    const fd = new FormData()
    fd.append("file", file)
    fd.append("cartId", cart.id)

    try {
      const res = await fetch("/api/prescriptions/upload", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok || !json?.data?.url) {
        throw new Error(json?.error || "Upload failed.")
      }
      const url = json.data.url as string
      startTransition(async () => {
        await setPrescriptionUrl(url)
        setPreviewUrl(url)
      })
    } catch (e: any) {
      setError(e?.message || "Upload failed.")
    }
  }

  const handleRemove = () => {
    setError(null)
    startTransition(async () => {
      await setPrescriptionUrl(null)
      setPreviewUrl(null)
    })
  }

  const isPdf = previewUrl?.toLowerCase?.().endsWith(".pdf")

  return (
    <div
      className="rounded-xl border border-amber-300/70 bg-amber-50/60 p-4 mb-6"
      data-testid="prescription-uploader"
    >
      <div className="flex items-start gap-3 mb-3">
        <i
          className="ph-fill ph-prescription text-amber-700 text-xl shrink-0 mt-0.5"
          aria-hidden
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-ink">
            Prescription required
          </h3>
          <p className="text-xs text-ink/65 leading-relaxed mt-0.5">
            One or more items in your cart need a valid prescription. Upload a
            clear photo or PDF — our pharmacist will verify it before dispatch.
          </p>
        </div>
      </div>

      {previewUrl ? (
        <div className="flex items-center gap-3 bg-bg rounded-lg border border-line p-2.5">
          {isPdf ? (
            <div className="w-12 h-12 rounded-md bg-surface flex items-center justify-center shrink-0">
              <i className="ph-fill ph-file-pdf text-xl text-rose-600" aria-hidden />
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Uploaded prescription"
              className="w-12 h-12 rounded-md object-cover shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-success flex items-center gap-1">
              <i className="ph-fill ph-check-circle text-sm" aria-hidden />
              Prescription uploaded
            </p>
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-primary hover:underline truncate block"
            >
              View / download
            </a>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            disabled={pending}
            className="h-8 px-3 text-[11px] font-medium text-ink/70 hover:text-ink rounded-full border border-line hover:border-ink/30 transition-colors disabled:opacity-50"
          >
            Replace
          </button>
        </div>
      ) : (
        <label
          className={`flex items-center justify-center gap-2 h-12 rounded-lg border-2 border-dashed border-amber-400/70 bg-amber-100/40 hover:bg-amber-100 cursor-pointer transition-colors ${
            pending ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
            className="hidden"
            disabled={pending}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
            }}
          />
          {pending ? (
            <>
              <i className="ph-bold ph-spinner animate-spin text-amber-800" aria-hidden />
              <span className="text-sm font-medium text-amber-900">Uploading…</span>
            </>
          ) : (
            <>
              <i className="ph-bold ph-upload-simple text-amber-800" aria-hidden />
              <span className="text-sm font-medium text-amber-900">
                Upload prescription (JPG, PNG, or PDF)
              </span>
            </>
          )}
        </label>
      )}

      {error && (
        <p className="mt-2 text-xs text-rose-600 flex items-center gap-1">
          <i className="ph-fill ph-warning-circle text-sm" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}
