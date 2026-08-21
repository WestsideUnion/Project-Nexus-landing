import React from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — Nexus",
  description:
    "Learn how Nexus and Westside Union collect, use, and protect your personal information.",
}

/* ─── Effective date ───────────────────────────────────────────────────────── */
const EFFECTIVE_DATE = "August 16, 2026"

/* ─── Reusable section component ───────────────────────────────────────────── */
function Section({
  id,
  heading,
  children,
}: {
  id: string
  heading: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-sm font-medium tracking-widest uppercase text-black/70 mb-4">
        {heading}
      </h2>
      <div className="space-y-4 text-sm text-black/55 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/nexus-logo.png"
              alt="Nexus logo"
              className="w-8 h-8 object-contain"
              style={{ imageRendering: "auto" }}
            />
            <span className="font-pixel text-xs tracking-[0.25em] text-black/70 group-hover:text-black transition-colors">
              NEXUS
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-black/35 hover:text-black/70 transition-colors tracking-widest"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Title block */}
        <div className="mb-16">
          <p className="text-[10px] tracking-[0.3em] text-black/30 uppercase mb-3">
            Legal
          </p>
          <h1 className="text-2xl md:text-3xl font-light text-[#111] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-black/30 tracking-widest">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="space-y-12">
          {/* ── 1. Who we are ─────────────────────────────────────────────────── */}
          <Section id="who-we-are" heading="1. Who we are">
            <p>
              Nexus is a managed AI assistant product built and operated
              by <strong className="text-black/70">Westside Union</strong>{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a
              company registered in Ontario, Canada. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit{" "}
              <strong className="text-black/70">nexus.westside-union.com</strong>{" "}
              (the &ldquo;Site&rdquo;) or use the Nexus service.
            </p>
          </Section>

          {/* ── 2. Information we collect ─────────────────────────────────────── */}
          <Section
            id="information-we-collect"
            heading="2. Information we collect"
          >
            <p>
              <strong className="text-black/70">
                Information you provide directly.
              </strong>{" "}
              When you submit the contact or &ldquo;Fit Session&rdquo; form on
              the Site, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Business name</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>City (optional)</li>
              <li>Industry</li>
              <li>Number of locations (optional)</li>
              <li>Primary communication channel (optional)</li>
              <li>Deployment preference (optional)</li>
              <li>Description of your business needs</li>
              <li>Current tools you use (optional)</li>
            </ul>
            <p>
              <strong className="text-black/70">
                Information collected automatically.
              </strong>{" "}
              When you visit the Site, we may automatically collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Device and browser information (type, operating system, screen
                resolution)
              </li>
              <li>IP address and approximate geographic location</li>
              <li>
                Pages visited, time spent, and referral source
              </li>
              <li>Web vitals and performance metrics</li>
            </ul>
            <p>
              This data is collected through{" "}
              <strong className="text-black/70">Vercel Analytics</strong>, a
              privacy-focused analytics service. Vercel Analytics does not use
              cookies for tracking and does not collect personally identifiable
              information.
            </p>
          </Section>

          {/* ── 3. How we use your information ────────────────────────────────── */}
          <Section
            id="how-we-use-information"
            heading="3. How we use your information"
          >
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Respond to your inquiries and schedule workflow review sessions
              </li>
              <li>
                Evaluate whether Nexus is a good fit for your business
              </li>
              <li>
                Communicate with you about the product, updates, and relevant
                opportunities
              </li>
              <li>Improve and optimize the Site and our services</li>
              <li>
                Comply with applicable legal obligations
              </li>
            </ul>
            <p>
              We will <strong className="text-black/70">not</strong> sell,
              rent, or share your personal information with third parties for
              their own marketing purposes.
            </p>
          </Section>

          {/* ── 4. Third-party services ───────────────────────────────────────── */}
          <Section
            id="third-party-services"
            heading="4. Third-party services"
          >
            <p>We use the following third-party services to operate the Site:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-black/10">
                    <th className="text-left py-2 pr-4 text-black/50 font-medium tracking-widest uppercase">
                      Service
                    </th>
                    <th className="text-left py-2 pr-4 text-black/50 font-medium tracking-widest uppercase">
                      Purpose
                    </th>
                    <th className="text-left py-2 text-black/50 font-medium tracking-widest uppercase">
                      Data shared
                    </th>
                  </tr>
                </thead>
                <tbody className="text-black/55">
                  <tr className="border-b border-black/[0.04]">
                    <td className="py-2.5 pr-4 text-black/70 font-medium">
                      Vercel
                    </td>
                    <td className="py-2.5 pr-4">Hosting &amp; analytics</td>
                    <td className="py-2.5">
                      Anonymized usage data, web vitals
                    </td>
                  </tr>
                  <tr className="border-b border-black/[0.04]">
                    <td className="py-2.5 pr-4 text-black/70 font-medium">
                      Resend
                    </td>
                    <td className="py-2.5 pr-4">
                      Transactional email delivery
                    </td>
                    <td className="py-2.5">
                      Contact form submissions (name, email, business details)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Each service processes data in accordance with their own privacy
              policies. We encourage you to review them.
            </p>
          </Section>

          {/* ── 5. Cookies ────────────────────────────────────────────────────── */}
          <Section id="cookies" heading="5. Cookies &amp; tracking">
            <p>
              The Site does <strong className="text-black/70">not</strong> use
              cookies for advertising or cross-site tracking. Vercel Analytics
              is cookie-free and privacy-compliant. Essential cookies may be
              used by our hosting provider for security and performance purposes
              (e.g., bot protection, load balancing).
            </p>
          </Section>

          {/* ── 6. Data retention ─────────────────────────────────────────────── */}
          <Section id="data-retention" heading="6. Data retention">
            <p>
              Contact form submissions are retained for as long as necessary to
              fulfil the purpose for which they were collected, typically no
              longer than 24 months from your last interaction with us. You may
              request earlier deletion at any time.
            </p>
          </Section>

          {/* ── 7. Data security ──────────────────────────────────────────────── */}
          <Section id="data-security" heading="7. Data security">
            <p>
              We implement reasonable technical and organizational measures to
              protect your personal information, including encryption in transit
              (TLS), secure hosting infrastructure, and access controls. However,
              no method of transmission over the internet is 100% secure and we
              cannot guarantee absolute security.
            </p>
          </Section>

          {/* ── 8. Your rights ────────────────────────────────────────────────── */}
          <Section id="your-rights" heading="8. Your rights">
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent for future communications</li>
              <li>
                Lodge a complaint with a data protection authority
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at the address below.
              We will respond within 30 days.
            </p>
          </Section>

          {/* ── 9. Canadian privacy law ───────────────────────────────────────── */}
          <Section
            id="canadian-privacy-law"
            heading="9. Canadian privacy law"
          >
            <p>
              We comply with Canada&rsquo;s{" "}
              <em>Personal Information Protection and Electronic Documents
              Act</em>{" "}
              (PIPEDA) and applicable provincial privacy legislation. If you are
              located in the European Economic Area, the United Kingdom, or
              another jurisdiction with data protection laws, we will process
              your information in accordance with applicable requirements.
            </p>
          </Section>

          {/* ── 10. Children's privacy ────────────────────────────────────────── */}
          <Section
            id="childrens-privacy"
            heading="10. Children&rsquo;s privacy"
          >
            <p>
              The Site and our services are not directed to individuals under
              the age of 18. We do not knowingly collect personal information
              from children. If you believe we have inadvertently collected such
              information, please contact us so we can promptly delete it.
            </p>
          </Section>

          {/* ── 11. Changes to this policy ────────────────────────────────────── */}
          <Section
            id="changes-to-this-policy"
            heading="11. Changes to this policy"
          >
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will revise the &ldquo;Effective&rdquo; date at the top of this
              page. We encourage you to review this policy periodically. Your
              continued use of the Site after changes are posted constitutes
              your acceptance of the updated policy.
            </p>
          </Section>

          {/* ── 12. Contact ──────────────────────────────────────────────────── */}
          <Section id="contact" heading="12. Contact us">
            <p>
              If you have questions or concerns about this Privacy Policy or
              your personal information, contact us at:
            </p>
            <div className="bg-black/[0.02] border border-black/[0.06] rounded-xl px-5 py-4 space-y-1 text-xs text-black/60">
              <p className="text-black/80 font-medium">
                Westside Union — Nexus
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:nexus@westside-union.com"
                  className="text-black/70 underline underline-offset-2 hover:text-black transition-colors"
                >
                  nexus@westside-union.com
                </a>
              </p>
              <p>Toronto, Ontario, Canada</p>
            </div>
          </Section>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-black/[0.06]">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs text-black/20">
            © 2026 Westside Union. All rights reserved.
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-black/40 hover:text-black/60 transition-colors tracking-widest"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-black/25 hover:text-black/55 transition-colors tracking-widest"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
