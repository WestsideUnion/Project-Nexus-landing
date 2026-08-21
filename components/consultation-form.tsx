"use client"

import React, { useState } from "react"
import { CONSULTATION_PACKAGE_OPTIONS } from "@/lib/site-data"

export function ConsultationForm({
  defaultPackage = "",
  title = "Show us the work that keeps following you home.",
  subtitle = "We will identify the first few tasks Nexus can take off your plate and recommend a practical starting point. If the numbers or workflow do not support Nexus, we will say so.",
}: {
  defaultPackage?: string
  title?: string
  subtitle?: string
}) {
  const [formState, setFormState] = useState<"idle" | "loading" | "submitted" | "error">("idle")
  const [formError, setFormError] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    industry: "",
    package: defaultPackage,
    problem: "",
    consent: false,
  })

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent || !form.email || !form.name || !form.business) return
    setFormState("loading")
    setFormError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error ?? "Something went wrong. Please try again.")
        setFormState("error")
      } else {
        setFormState("submitted")
      }
    } catch {
      setFormError("Network error — please check your connection and try again.")
      setFormState("error")
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] overflow-hidden">
      {/* Background imagery */}
      <img
        src="/images/footer.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
        style={{ opacity: 0.85 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 55%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.08] mb-4 text-[#111]"
            style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-black/60 max-w-lg mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {formState === "submitted" ? (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-6 rounded-2xl border border-emerald-600/20 bg-emerald-50 text-emerald-800 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-sm font-light leading-relaxed">
                Thank you — we will be in touch within one business day for your free workflow review.
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/[0.07] p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  YOUR NAME *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Jane Doe"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="business" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  BUSINESS NAME *
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  required
                  value={form.business}
                  onChange={handleFormChange}
                  placeholder="Acme Cafe"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  EMAIL *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="jane@example.com"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  PHONE (OPTIONAL)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="(416) 555-0123"
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="industry" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  INDUSTRY *
                </label>
                <select
                  id="industry"
                  name="industry"
                  required
                  value={form.industry}
                  onChange={handleFormChange}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                >
                  <option value="">Select industry</option>
                  <option>Restaurant</option>
                  <option>Barbershop / Salon</option>
                  <option>Coffee Shop / Café</option>
                  <option>Automotive / Dealership</option>
                  <option>Marketing / Agency</option>
                  <option>Trades / Plumbing / Home Services</option>
                  <option>Clinic / Professional Office</option>
                  <option>Start Your Business — Canada</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="package" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                  PACKAGE *
                </label>
                <select
                  id="package"
                  name="package"
                  required
                  value={form.package}
                  onChange={handleFormChange}
                  className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all"
                >
                  <option value="">Select package</option>
                  {CONSULTATION_PACKAGE_OPTIONS.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="problem" className="block text-[11px] tracking-widest text-black/50 mb-2 font-medium">
                WHAT WORK KEEPS FOLLOWING YOU HOME?
              </label>
              <textarea
                id="problem"
                name="problem"
                rows={3}
                value={form.problem}
                onChange={handleFormChange}
                placeholder="Describe the tasks, messages, reviews, or follow-ups that take time away from running your business..."
                className="w-full bg-black/[0.02] border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/30 focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/20 transition-all resize-none"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                checked={form.consent}
                onChange={handleFormChange}
                className="mt-0.5 w-4 h-4 rounded border-black/20 accent-black focus:ring-2 focus:ring-black/20"
              />
              <label htmlFor="consent" className="text-xs text-black/55 leading-relaxed">
                I agree to be contacted by Westside Union regarding Nexus. My information will not be shared with third parties. *
              </label>
            </div>

            {formError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {formError}
              </p>
            )}

            <button
              type="submit"
              disabled={formState === "loading"}
              className="w-full py-4 bg-[#111] text-white text-xs sm:text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest uppercase font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              {formState === "loading" ? "SENDING…" : "Book a Free Consultation"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
