import { defineWidgetConfig } from "@medusajs/admin-sdk"
import {
  Container,
  Heading,
  Button,
  Label,
  Switch,
  toast,
} from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RichEditor from "../components/RichEditor"
import { A, adminHelpText } from "../lib/admin-theme"

/**
 * Pharmacy widget — pharmacy-specific fields on the product detail page.
 *
 * Persists on `product.metadata`:
 *   - requires_prescription   → boolean. When true, the storefront checkout
 *                               blocks order placement until the customer
 *                               uploads a valid prescription.
 *   - rich_description_en     → HTML body shown in the PDP "English" tab.
 *   - rich_description_ur     → HTML body shown in the PDP "اردو" tab
 *                               (rendered with lang="ur" dir="rtl").
 *
 * All three fields live on metadata so this works without a database
 * migration. If a future schema upgrade adds first-class columns, the
 * storefront already reads from both sources (metadata wins for now).
 */

type Patch = {
  requires_prescription: boolean
  rich_description_en: string
  rich_description_ur: string
}

async function fetchPharmacy(productId: string): Promise<Patch & { metadata: Record<string, any> }> {
  const res = await fetch(`/admin/products/${productId}?fields=metadata`, {
    credentials: "include",
  })
  if (!res.ok) throw new Error(await res.text())
  const { product } = await res.json()
  const m = (product?.metadata || {}) as Record<string, any>
  const rxRaw = m.requires_prescription
  return {
    requires_prescription: rxRaw === true || rxRaw === "true",
    rich_description_en: (m.rich_description_en || "").toString(),
    rich_description_ur: (m.rich_description_ur || "").toString(),
    metadata: m,
  }
}

async function savePharmacy(
  productId: string,
  patch: Patch,
  existingMetadata: Record<string, any>
) {
  const next = {
    ...existingMetadata,
    requires_prescription: patch.requires_prescription,
    rich_description_en: patch.rich_description_en?.trim() || null,
    rich_description_ur: patch.rich_description_ur?.trim() || null,
  }
  const res = await fetch(`/admin/products/${productId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ metadata: next }),
  })
  if (!res.ok) throw new Error(await res.text())
}

const ProductPharmacyWidget = () => {
  const { id: productId } = useParams()
  const [requiresRx, setRequiresRx] = useState(false)
  const [enHtml, setEnHtml] = useState("")
  const [urHtml, setUrHtml] = useState("")
  const [savedMeta, setSavedMeta] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (!productId) return
    fetchPharmacy(productId)
      .then((p) => {
        setRequiresRx(p.requires_prescription)
        setEnHtml(p.rich_description_en)
        setUrHtml(p.rich_description_ur)
        setSavedMeta(p.metadata)
      })
      .catch((e) => toast.error("Load failed: " + (e as Error).message))
      .finally(() => setLoading(false))
  }, [productId])

  const onSave = async () => {
    if (!productId) return
    setSaving(true)
    try {
      await savePharmacy(
        productId,
        {
          requires_prescription: requiresRx,
          rich_description_en: enHtml,
          rich_description_ur: urHtml,
        },
        savedMeta
      )
      setSavedMeta((m) => ({
        ...m,
        requires_prescription: requiresRx,
        rich_description_en: enHtml.trim() || null,
        rich_description_ur: urHtml.trim() || null,
      }))
      setDirty(false)
      toast.success("Pharmacy fields saved")
    } catch (e: any) {
      toast.error("Save failed: " + (e?.message || e))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Container className="p-4">
        <Label>Pharmacy</Label>
        <p style={{ fontSize: 13, color: A.fgMuted, marginTop: 4 }}>Loading…</p>
      </Container>
    )
  }

  return (
    <Container className="p-4">
      <div style={{ marginBottom: 16 }}>
        <Heading level="h2" className="text-base font-semibold">
          Pharmacy
        </Heading>
        <p style={{ fontSize: 12, color: A.fgMuted, marginTop: 4 }}>
          Prescription requirement and dual-language descriptions for medical
          products. Stored on <code>product.metadata</code>.
        </p>
      </div>

      {/* Prescription required toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 12,
          border: A.border,
          borderRadius: 8,
          background: requiresRx ? "#fff8e6" : A.bgCard,
          marginBottom: 16,
        }}
      >
        <Switch
          checked={requiresRx}
          onCheckedChange={(v: boolean) => {
            setRequiresRx(v)
            setDirty(true)
          }}
          id="requires-rx"
        />
        <div style={{ flex: 1 }}>
          <Label htmlFor="requires-rx" style={{ cursor: "pointer" }}>
            Prescription required
          </Label>
          <p style={{ ...adminHelpText, marginTop: 2 }}>
            Customers must upload a valid prescription image / PDF in checkout
            before placing an order containing this product.
          </p>
        </div>
      </div>

      {/* English description */}
      <div style={{ marginBottom: 16 }}>
        <Label>English description</Label>
        <p style={adminHelpText}>
          Long-form description shown in the storefront PDP "English" tab.
        </p>
        <div style={{ marginTop: 6 }}>
          <RichEditor
            value={enHtml}
            onChange={(html) => {
              setEnHtml(html)
              setDirty(true)
            }}
            placeholder="Write English description, dosage instructions, side effects…"
          />
        </div>
      </div>

      {/* Urdu description (RTL) */}
      <div style={{ marginBottom: 16 }}>
        <Label>اردو تفصیل (Urdu description)</Label>
        <p style={adminHelpText}>
          PDP "اردو" tab — rendered right-to-left for Urdu script readability.
        </p>
        <div style={{ marginTop: 6, direction: "rtl" }}>
          <RichEditor
            value={urHtml}
            onChange={(html) => {
              setUrHtml(html)
              setDirty(true)
            }}
            placeholder="اردو میں دوا کی تفصیل، خوراک، احتیاطیں لکھیں…"
          />
        </div>
      </div>

      {/* Save bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, alignItems: "center" }}>
        {dirty && (
          <span style={{ fontSize: 11, color: A.warning }}>Unsaved changes</span>
        )}
        <Button
          variant="primary"
          size="small"
          onClick={onSave}
          disabled={saving || !dirty}
        >
          {saving ? "Saving…" : "Save Pharmacy Info"}
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductPharmacyWidget
