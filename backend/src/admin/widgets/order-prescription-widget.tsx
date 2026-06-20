import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Badge } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { A, adminHelpText } from "../lib/admin-theme"

/**
 * Admin order widget — surfaces the customer's uploaded prescription so
 * the pharmacist can verify it before fulfilment.
 *
 * Reads from `order.metadata.prescription_url` (transferred from
 * `cart.metadata` when checkout completes). Renders nothing for orders
 * that don't carry one — i.e. no over-the-counter products silently
 * trigger an empty card.
 */
const OrderPrescriptionWidget = () => {
  const { id: orderId } = useParams()
  const [data, setData] = useState<{
    url: string
    uploadedAt?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  useEffect(() => {
    if (!orderId) return
    fetch(`/admin/orders/${orderId}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((res) => {
        const meta = res?.order?.metadata || {}
        const url = (meta.prescription_url || "").toString().trim()
        if (url) {
          setData({
            url,
            uploadedAt: meta.prescription_uploaded_at
              ? String(meta.prescription_uploaded_at)
              : undefined,
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading || !data) return null

  const isPdf = data.url.toLowerCase().endsWith(".pdf")
  const uploaded = data.uploadedAt ? new Date(data.uploadedAt) : null

  return (
    <Container className="p-4">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <Heading level="h2" className="text-base font-semibold">
          Customer prescription
        </Heading>
        <Badge color="orange">Pharmacy</Badge>
      </div>

      <p style={adminHelpText}>
        Verify this prescription is valid and matches the medicines below
        before marking the order as fulfilled.
      </p>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          padding: 12,
          border: A.border,
          borderRadius: 8,
          background: A.bgCard,
        }}
      >
        {isPdf ? (
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 8,
              background: A.bgField,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#dc2626",
              flexShrink: 0,
            }}
          >
            PDF
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.url}
            alt="Customer prescription"
            style={{
              width: 88,
              height: 88,
              borderRadius: 8,
              objectFit: "cover",
              flexShrink: 0,
              cursor: "zoom-in",
              border: "2px solid transparent",
              transition: "border-color 0.15s ease",
            }}
            onClick={() => setIsLightboxOpen(true)}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = A.linkColor || "#2563eb")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "transparent")}
          />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          {uploaded && (
            <p style={{ fontSize: 12, color: A.fgMuted, marginBottom: 4 }}>
              Uploaded {uploaded.toLocaleString()}
            </p>
          )}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: A.linkColor || "#2563eb",
                textDecoration: "underline",
                wordBreak: "break-all",
              }}
            >
              Open / Download
            </a>
            {!isPdf && (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontSize: 13,
                  fontWeight: 600,
                  color: A.linkColor || "#2563eb",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Quick View
              </button>
            )}
          </div>
          <p style={{ ...adminHelpText, marginTop: 6, wordBreak: "break-all" }}>
            {data.url}
          </p>
        </div>
      </div>

      {isLightboxOpen && !isPdf && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 36,
              cursor: "pointer",
              lineHeight: 1,
            }}
            onClick={(e) => {
              e.stopPropagation()
              setIsLightboxOpen(false)
            }}
          >
            &times;
          </button>
          <img
            src={data.url}
            alt="Customer prescription full resolution"
            style={{
              maxWidth: "92%",
              maxHeight: "92vh",
              objectFit: "contain",
              borderRadius: 8,
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              cursor: "default",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderPrescriptionWidget
