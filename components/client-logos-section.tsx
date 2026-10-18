"use client"

import React from "react"

interface Client {
  name: string
  industry: string
  logo: string
  imgClassName: string
}

const CLIENTS: Client[] = [
  {
    name: "La Gloria",
    industry: "Hospitality & Cuisine",
    logo: "/clients/la-gloria.png",
    imgClassName: "h-10 sm:h-12 max-w-[130px] w-auto object-contain",
  },
  {
    name: "Latino Express",
    industry: "Automotive & Logistics",
    logo: "/clients/latino-express.png",
    imgClassName: "h-9 sm:h-11 max-w-[160px] w-auto object-contain",
  },
  {
    name: "Journey Studio",
    industry: "Creative & Design",
    logo: "/clients/journey-studio.jpg",
    imgClassName: "h-10 sm:h-12 max-w-[120px] w-auto object-contain",
  },
  {
    name: "Latin Marketing",
    industry: "Agencies & Growth",
    logo: "/clients/latin-marketing.png",
    imgClassName: "h-11 sm:h-13 max-w-[130px] w-auto object-contain",
  },
  {
    name: "WeiInsight",
    industry: "Artist & Creator",
    logo: "/clients/weiinsight.png",
    imgClassName: "h-10 sm:h-11 max-w-[110px] w-auto object-contain",
  },
]

export function ClientLogosSection() {
  return (
    <section
      id="clients"
      className="relative z-20 py-14 sm:py-16 px-6 md:px-12 lg:px-20 border-t border-black/[0.06] bg-[#FAF9F5]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-widest text-black/60 bg-black/[0.04] uppercase font-medium mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Pilot Partners &amp; Client Deployments</span>
          </div>
          <p className="text-xs sm:text-sm text-black/60 max-w-lg font-light leading-relaxed">
            Trusted by independent business owners and growing operators across Canada.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs hover:border-black/[0.16] hover:shadow-md transition-all duration-300 min-h-[120px]"
            >
              {/* Logo container with optical centering */}
              <div className="flex-1 w-full flex items-center justify-center py-1">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={`${client.imgClassName} filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300`}
                  loading="lazy"
                />
              </div>

              {/* Client Industry Label */}
              <div className="w-full pt-2 border-t border-black/[0.04] text-center mt-1">
                <span className="block text-[10px] font-mono tracking-wider uppercase text-black/45 group-hover:text-black/80 transition-colors truncate">
                  {client.industry}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
