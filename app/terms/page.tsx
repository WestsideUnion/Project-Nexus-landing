import React from "react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service — Nexus",
  description:
    "Terms and conditions governing your use of the Nexus website and managed AI assistant service by Westside Union.",
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
export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xs text-black/30 tracking-widest">
            Effective {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="space-y-12">
          {/* ── 1. Agreement ──────────────────────────────────────────────────── */}
          <Section id="agreement" heading="1. Agreement to terms">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally
              binding agreement between you and{" "}
              <strong className="text-black/70">Westside Union</strong>{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a
              company registered in Ontario, Canada, governing your access to
              and use of the{" "}
              <strong className="text-black/70">nexus.westside-union.com</strong>{" "}
              website (the &ldquo;Site&rdquo;) and the Nexus managed AI
              assistant service (the &ldquo;Service&rdquo;).
            </p>
            <p>
              By accessing the Site or using the Service, you agree to be bound
              by these Terms and our{" "}
              <Link
                href="/privacy"
                className="text-black/70 underline underline-offset-2 hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              . If you do not agree, you must not use the Site or Service.
            </p>
          </Section>

          {/* ── 2. Eligibility ────────────────────────────────────────────────── */}
          <Section id="eligibility" heading="2. Eligibility">
            <p>
              You must be at least 18 years of age and have the legal capacity
              to enter into a binding agreement to use the Site and Service. By
              using Nexus, you represent and warrant that you meet these
              requirements and that you are authorized to act on behalf of any
              business entity you represent.
            </p>
          </Section>

          {/* ── 3. Service description ────────────────────────────────────────── */}
          <Section
            id="service-description"
            heading="3. Service description"
          >
            <p>
              Nexus is a managed AI assistant for business owners. The
              Service may include, depending on your plan:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                AI-powered task handling across messaging channels (WhatsApp,
                email, SMS)
              </li>
              <li>Routine automation, reminders, and follow-ups</li>
              <li>
                Content drafts, review responses, and promotional material
              </li>
              <li>Weekly summaries and operational reporting</li>
              <li>
                Managed setup, configuration, and ongoing support by Westside
                Union
              </li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the Service at any time, with or without notice. We will make
              reasonable efforts to communicate material changes in advance.
            </p>
          </Section>

          {/* ── 4. Plans & billing ────────────────────────────────────────────── */}
          <Section id="plans-and-billing" heading="4. Plans &amp; billing">
            <p>
              Nexus is offered through paid subscription plans. Pricing,
              features, and plan details are described on the Site and may change
              from time to time.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong className="text-black/70">Fees.</strong> You agree to
                pay all applicable fees as described in your selected plan.
                Setup fees, if any, are due upon onboarding.
              </li>
              <li>
                <strong className="text-black/70">Billing cycle.</strong>{" "}
                Subscription fees are billed monthly unless otherwise agreed.
                All amounts are in Canadian dollars (CAD) unless stated
                otherwise.
              </li>
              <li>
                <strong className="text-black/70">Taxes.</strong> All fees are
                exclusive of applicable taxes (HST/GST), which will be added
                where required by law.
              </li>
              <li>
                <strong className="text-black/70">Late payments.</strong> We
                reserve the right to suspend access to the Service for overdue
                accounts after providing reasonable notice.
              </li>
            </ul>
          </Section>

          {/* ── 5. Your obligations ───────────────────────────────────────────── */}
          <Section
            id="your-obligations"
            heading="5. Your obligations"
          >
            <p>When using the Site and Service, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Violate any applicable local, provincial, national, or
                international law or regulation
              </li>
              <li>
                Provide false, misleading, or inaccurate information
              </li>
              <li>
                Attempt to gain unauthorized access to our systems or
                infrastructure
              </li>
              <li>
                Use the Service to send spam, phishing, or unsolicited
                communications
              </li>
              <li>
                Reverse-engineer, decompile, or disassemble any part of the
                Service
              </li>
              <li>
                Use the Service in a way that could harm, disable, or impair
                its operation
              </li>
              <li>
                Resell, sublicense, or redistribute the Service without our
                prior written consent
              </li>
            </ul>
          </Section>

          {/* ── 6. Intellectual property ───────────────────────────────────────── */}
          <Section
            id="intellectual-property"
            heading="6. Intellectual property"
          >
            <p>
              All content on the Site — including text, graphics, logos, icons,
              images, software, and the Nexus and Westside Union brand
              marks — is the property of Westside Union or its licensors and is
              protected by Canadian and international intellectual property
              laws.
            </p>
            <p>
              <strong className="text-black/70">Your content.</strong> You
              retain ownership of all data, documents, and content you provide
              to the Service (&ldquo;Your Content&rdquo;). By using the Service,
              you grant us a limited, non-exclusive license to process Your
              Content solely to provide and improve the Service for you.
            </p>
            <p>
              <strong className="text-black/70">AI-generated outputs.</strong>{" "}
              Outputs produced by the Service (drafts, summaries, responses) are
              provided for your use. We do not claim ownership of these outputs.
              You are responsible for reviewing and approving all AI-generated
              content before it is shared externally.
            </p>
          </Section>

          {/* ── 7. Data & privacy ─────────────────────────────────────────────── */}
          <Section id="data-and-privacy" heading="7. Data &amp; privacy">
            <p>
              Your use of the Service is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-black/70 underline underline-offset-2 hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect your
              information. By using the Service, you consent to the practices
              described therein.
            </p>
            <p>
              We will not use Your Content to train general-purpose AI models
              or share it with third parties except as necessary to deliver the
              Service.
            </p>
          </Section>

          {/* ── 8. Disclaimers ────────────────────────────────────────────────── */}
          <Section id="disclaimers" heading="8. Disclaimers">
            <p>
              The Site and Service are provided on an{" "}
              <strong className="text-black/70">
                &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              </strong>{" "}
              basis, without warranties of any kind, whether express, implied, or
              statutory.
            </p>
            <p>We specifically disclaim:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Warranties of merchantability, fitness for a particular purpose,
                and non-infringement
              </li>
              <li>
                That the Service will be uninterrupted, error-free, or secure
              </li>
              <li>
                That AI-generated outputs will be accurate, complete, or
                suitable for any specific purpose
              </li>
            </ul>
            <p>
              <strong className="text-black/70">
                AI outputs require human review.
              </strong>{" "}
              Nexus is designed to assist, not replace, human judgment.
              You acknowledge that all AI-generated content should be reviewed
              before being relied upon or shared externally.
            </p>
          </Section>

          {/* ── 9. Limitation of liability ────────────────────────────────────── */}
          <Section
            id="limitation-of-liability"
            heading="9. Limitation of liability"
          >
            <p>
              To the maximum extent permitted by applicable law, Westside Union
              and its directors, employees, agents, and affiliates shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including but not limited to loss of profits,
              data, business opportunities, or goodwill, arising out of or
              related to your use of the Site or Service.
            </p>
            <p>
              Our total aggregate liability for all claims arising under these
              Terms shall not exceed the total fees you have paid us in the
              twelve (12) months immediately preceding the event giving rise to
              the claim.
            </p>
          </Section>

          {/* ── 10. Indemnification ───────────────────────────────────────────── */}
          <Section id="indemnification" heading="10. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless Westside Union
              and its officers, directors, employees, and agents from any
              claims, damages, losses, or expenses (including reasonable legal
              fees) arising from your use of the Service, your violation of
              these Terms, or your infringement of any third-party rights.
            </p>
          </Section>

          {/* ── 11. Termination ───────────────────────────────────────────────── */}
          <Section id="termination" heading="11. Termination">
            <p>
              <strong className="text-black/70">By you.</strong> You may cancel
              your subscription at any time by contacting us. Cancellation takes
              effect at the end of the current billing period.
            </p>
            <p>
              <strong className="text-black/70">By us.</strong> We may suspend
              or terminate your access to the Service immediately if you breach
              these Terms, or with 30 days&rsquo; notice for any other reason.
            </p>
            <p>
              Upon termination, we will make Your Content available for export
              for a reasonable period (at least 30 days). After that period, we
              may delete Your Content from our systems.
            </p>
          </Section>

          {/* ── 12. Governing law ─────────────────────────────────────────────── */}
          <Section id="governing-law" heading="12. Governing law">
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the Province of Ontario and the federal laws of Canada
              applicable therein, without regard to conflict of law principles.
              Any disputes arising from these Terms shall be subject to the
              exclusive jurisdiction of the courts located in Toronto, Ontario.
            </p>
          </Section>

          {/* ── 13. Modifications ─────────────────────────────────────────────── */}
          <Section id="modifications" heading="13. Modifications to terms">
            <p>
              We reserve the right to modify these Terms at any time. When we
              make material changes, we will update the &ldquo;Effective&rdquo;
              date at the top of this page and, where appropriate, notify you via
              email or through the Service. Your continued use of the Service
              after such changes constitutes your acceptance of the revised
              Terms.
            </p>
          </Section>

          {/* ── 14. Severability ──────────────────────────────────────────────── */}
          <Section id="severability" heading="14. Severability">
            <p>
              If any provision of these Terms is found to be unenforceable or
              invalid, that provision shall be limited or eliminated to the
              minimum extent necessary so that these Terms shall otherwise
              remain in full force and effect.
            </p>
          </Section>

          {/* ── 15. Entire agreement ──────────────────────────────────────────── */}
          <Section id="entire-agreement" heading="15. Entire agreement">
            <p>
              These Terms, together with the Privacy Policy and any specific
              service agreements you may enter into with us, constitute the
              entire agreement between you and Westside Union regarding the use
              of the Site and Service, superseding all prior communications and
              proposals.
            </p>
          </Section>

          {/* ── 16. Contact ──────────────────────────────────────────────────── */}
          <Section id="contact" heading="16. Contact us">
            <p>
              If you have questions about these Terms, contact us at:
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
              className="text-xs text-black/25 hover:text-black/55 transition-colors tracking-widest"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-black/40 hover:text-black/60 transition-colors tracking-widest"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
