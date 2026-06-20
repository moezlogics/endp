import { NextRequest, NextResponse } from "next/server"

/**
 * Upload route for customer prescriptions.
 *
 * Proxies the image / PDF to the project's custom CDN, then returns the
 * resulting public URL. The storefront stores that URL on the cart's
 * metadata (via `setPrescriptionUrl`) so checkout can validate it.
 *
 * No customer auth required — guest checkout must be able to upload too.
 * The CDN call uses a server-only API key, never exposed to the browser.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 })
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"]
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, WEBP, HEIC images and PDF files are allowed." },
        { status: 400 }
      )
    }

    // Prescriptions can be multi-page scans → 15MB ceiling
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File must be under 15MB." },
        { status: 413 }
      )
    }

    const cartId = String(formData.get("cartId") || "anon").trim()
    const safeCartId = cartId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48) || "anon"

    const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || "http://localhost:3051"
    const cdnKey = process.env.CDN_API_KEY || "ecomm-cdn-secret-key-change-in-production"

    const cdnFormData = new FormData()
    // The CDN's media route accepts `image`; for a PDF we still send under
    // the same field name — the CDN persists by content-type, not extension.
    cdnFormData.append("image", file)
    cdnFormData.append("slug", `rx-${safeCartId}-${Date.now()}`)

    const cdnRes = await fetch(`${cdnUrl}/api/media/upload`, {
      method: "POST",
      headers: { "x-cdn-key": cdnKey },
      body: cdnFormData,
    })

    const cdnData = await cdnRes.json()
    if (!cdnRes.ok || !cdnData.success) {
      return NextResponse.json(
        { error: cdnData?.error || "Failed to upload prescription." },
        { status: cdnRes.status || 500 }
      )
    }

    return NextResponse.json({
      data: {
        url: cdnData.data?.url || cdnData.url,
      },
    })
  } catch (error: any) {
    console.error("[Prescription Upload]", error)
    return NextResponse.json(
      { error: error?.message || "Failed to upload prescription." },
      { status: 500 }
    )
  }
}
