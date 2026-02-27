'use client'

import { useState } from 'react'
import Link from 'next/link'

export function FooterSection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative w-full min-h-125 flex flex-col overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col flex-1 px-6 md:px-10 pt-14 pb-8">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full gap-8">
          {/* Logo and Newsletter Heading */}
          <div className="flex flex-col">
            <h1 className="text-white font-black text-[clamp(50px,12vw,160px)] leading-none tracking-tight select-none">
              Plaiss
            </h1>
            <div className="mt-4">
              <h3 className="text-white text-2xl font-normal">Stay Inspired</h3>
              <p className="text-white/80 text-sm mt-1">
                Receive the latest trends to your inbox
              </p>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="flex flex-row flex-wrap gap-8 md:gap-16 pt-2">
            {/* Shop Links */}
            <ul className="flex flex-col gap-4 text-white text-sm font-light">
              <li className="hover:underline cursor-pointer">
                <Link href="/sofas" className="hover:underline">
                  Sofas
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="/lounge-chairs" className="hover:underline">
                  Lounge Chairs
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="/tables" className="hover:underline">
                  Tables
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <Link href="/chairs" className="hover:underline">
                  Chairs
                </Link>
              </li>
              <li className="hover:underline cursor-pointer">
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>

            {/* Policy Links */}
            <ul className="flex flex-col gap-4 text-white text-sm font-light">
              <li className="hover:underline cursor-pointer">
                Terms &amp; Conditions
              </li>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Refund Policy</li>
              <li className="hover:underline cursor-pointer">
                Shipping policy
              </li>
              <li className="hover:underline cursor-pointer">
                Accessibility statement
              </li>
              <li className="hover:underline cursor-pointer">FAQ</li>
            </ul>

            {/* Social Links */}
            <ul className="flex flex-col gap-4 text-white text-sm font-light">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
              <li className="hover:underline cursor-pointer">TikTok</li>
              <li className="hover:underline cursor-pointer">Pinterest</li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full mt-10 gap-8 relative">
          {/* Newsletter */}
          <div className="flex flex-col gap-3 max-w-sm">
            <div className="mt-1">
              <label className="text-white text-xs mb-1 block">
                Email address <span className="text-white">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                className={`w-full max-w-xs px-4 py-2.5 rounded-full bg-transparent border text-white placeholder:text-white/50 text-sm outline-none transition-colors ${
                  error
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-white/60 focus:border-white'
                }`}
              />
              {error && (
                <p className="text-red-400 text-xs mt-1 pl-2">{error}</p>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="w-4 h-4 accent-yellow-400"
              />
              <span className="text-white/80 text-xs">
                Yes, subscribe me to your newsletter.
              </span>
            </label>

            <button
              onClick={() => {
                if (!email) {
                  setError('Email address is required.')
                  return
                }
                if (!isValidEmail(email)) {
                  setError('Please enter a valid email address.')
                  return
                }
                if (!checked) {
                  setError('Please agree to subscribe.')
                  return
                }
                setError('')
                setSubscribed(true)
              }}
              className="bg-lime-300 text-black px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg w-fit"
            >
              {subscribed ? 'Subscribed!' : 'Submit'}
            </button>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 text-white text-sm font-light mb-1">
            <p className="text-xl font-normal mb-1">Contact</p>
            <p>Info@mysite.com</p>
            <p>Tel: 123-456-7890</p>
            <p>
              500 Terry Francine St
              <br />
              San Francisco, CA 94158
            </p>
            <p>Monday-Friday 9:00am – 7:00pm EST</p>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition-colors mb-1 self-end md:self-auto"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
