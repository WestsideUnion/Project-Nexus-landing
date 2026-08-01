import { Resend } from "resend"
import { NextRequest, NextResponse } from "next/server"

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "nexus@westside-union.com"
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "nexus@westside-union.com"

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY?.trim()
    if (!apiKey || apiKey === "re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
      console.error("[Resend] Missing or unconfigured RESEND_API_KEY")
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured in environment variables." },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const body = await req.json()

    const {
      name,
      business,
      email,
      phone,
      city,
      industry,
      locations,
      channel,
      problem,
      tools,
      deployment,
    } = body

    // Basic server-side validation
    if (!name || !email || !business) {
      return NextResponse.json(
        { error: "Name, email, and business name are required." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const html = `
      <table style="font-family:system-ui,sans-serif;font-size:14px;color:#111;max-width:600px;width:100%;border-collapse:collapse;">
        <tr><td colspan="2" style="padding:20px 0 8px;border-bottom:1px solid #e5e5e5;font-size:18px;font-weight:300;">
          New Nexus Fit Session Request
        </td></tr>
        ${row("Name", name)}
        ${row("Business", business)}
        ${row("Email", email)}
        ${row("Phone", phone || "—")}
        ${row("City", city || "—")}
        ${row("Industry", industry || "—")}
        ${row("Locations", locations || "—")}
        ${row("Primary channel", channel || "—")}
        ${row("Deployment preference", deployment || "—")}
        ${row("Problem / goal", problem || "—", true)}
        ${row("Current tools", tools || "—", true)}
        <tr><td colspan="2" style="padding:16px 0 0;color:#999;font-size:11px;">
          Submitted via projectnexus.ca contact form
        </td></tr>
      </table>
    `

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nexus Fit Session — ${name} · ${business}`,
      html,
    })

    if (error) {
      console.error("[Resend] send error:", error)
      return NextResponse.json(
        { error: error.message || "Failed to send. Please check your email configuration." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact/route] unexpected error:", err)
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 })
  }
}

function row(label: string, value: string, multiline = false) {
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;vertical-align:top;color:#999;white-space:nowrap;font-size:12px;text-transform:uppercase;letter-spacing:.05em;">
        ${label}
      </td>
      <td style="padding:10px 0;vertical-align:top;${multiline ? "white-space:pre-wrap;" : ""}">
        ${value}
      </td>
    </tr>
  `
}
