'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type NavSubItem = { label: string; href: string }
type NavItem = { label: string; href: string; sub: NavSubItem[] }

const NAV_ITEMS: NavItem[] = [
  { label: 'Furniture', href: '/furniture', sub: [] },
  { label: 'Outdoor', href: '/outdoor', sub: [] },
  { label: 'Lighting', href: '/lighting', sub: [] },
  { label: 'Decor', href: '/decor', sub: [] },
  { label: 'Textiles & Bedding', href: '/textiles-bedding', sub: [] },
  { label: 'Rugs', href: '/rugs', sub: [] },
  { label: 'Kitchen', href: '/kitchen', sub: [] },
  { label: 'Storage', href: '/storage', sub: [] },
  { label: 'Baby & Kids', href: '/baby-kids', sub: [] },
  { label: 'Home Improvement', href: '/home-improvement', sub: [] },
  { label: 'Pet', href: '/pet', sub: [] },
  { label: 'Holiday', href: '/holiday', sub: [] },
  { label: 'Shop by Room', href: '/shop-by-room', sub: [] },
]

export function Header() {
  const [navState, setNavState] = useState<'top' | 'scrolling' | 'hidden'>(
    'top'
  )
  const [hovered, setHovered] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Drag-to-scroll handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (navRef.current?.offsetLeft ?? 0)
    scrollLeft.current = navRef.current?.scrollLeft ?? 0
    if (navRef.current) navRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !navRef.current) return
    e.preventDefault()
    const x = e.pageX - navRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    navRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const onMouseUpOrLeave = useCallback(() => {
    isDragging.current = false
    if (navRef.current) navRef.current.style.cursor = 'grab'
  }, [])

  // Convert vertical wheel scroll to horizontal scroll on the nav
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handleWheel = (e: WheelEvent) => {
      if (nav.scrollWidth <= nav.clientWidth) return
      e.preventDefault()
      nav.scrollLeft += e.deltaY || e.deltaX
    }
    nav.addEventListener('wheel', handleWheel, { passive: false })
    return () => nav.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setNavState('top')
      } else if (currentScrollY < heroHeight * 0.9) {
        setNavState('scrolling')
      } else {
        // If scrolling up, show the header. If scrolling down, hide it.
        if (currentScrollY < lastScrollY) {
          setNavState('scrolling')
        } else {
          setNavState('hidden')
        }
      }

      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500 ease-in-out
          ${
            navState === 'hidden'
              ? 'opacity-0 -translate-y-3 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }
          ${
            navState === 'scrolling'
              ? 'backdrop-blur-md bg-white/10 shadow-[0_4px_30px_rgba(255,255,255,0.08)]'
              : 'bg-transparent'
          }
        `}
      >
        {/* Logo */}
        <div className="relative flex items-center shrink-0">
          <img
            src="images/logo3.png"
            alt="Plaiss Logo"
            className="h-10 w-auto object-contain"
            style={{ maxHeight: '2.5rem' }}
          />
        </div>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="relative flex-1 min-w-0 hidden lg:flex overflow-x-auto scrollbar-hide mx-8 xl:mx-12 cursor-grab select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maskImage:
              'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
        >
          <div className="flex items-center gap-5 xl:gap-7 text-sm font-normal text-black/90 whitespace-nowrap px-6">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative flex flex-col items-center shrink-0"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  className={`relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:text-black transition-colors px-2 py-1 whitespace-nowrap ${
                    hovered === item.label ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                </Link>
                {item.sub.length > 0 && hovered === item.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div
                      className={`min-w-95 w-105 grid grid-cols-2 gap-x-40 gap-y-4 py-4 pr-16 pl-6 rounded
                      ${
                        navState === 'scrolling'
                          ? 'backdrop-blur-md bg-transparent border-none shadow-none'
                          : 'bg-white shadow-xl'
                      }
                    `}
                    >
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`text-base whitespace-nowrap px-2 py-1 rounded transition-colors
                        ${navState === 'scrolling' ? 'text-black hover:bg-black/10' : 'text-black hover:bg-black/5'}`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Right side: Shop + Hamburger */}
        <div className="relative flex items-center gap-4 shrink-0">
          <button className="bg-black text-white px-6 md:px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
            Shop
          </button>

          {/* Hamburger – mobile only */}
          <button
            className="lg:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col pt-20 px-6 sm:px-8 pb-8 lg:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          mobileOpen
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <span className="block h-0.5 w-6 bg-black rotate-45 absolute" />
          <span className="block h-0.5 w-6 bg-black -rotate-45 absolute" />
        </button>

        <nav className="flex flex-col gap-1 mt-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="flex flex-col">
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-normal text-black/90 hover:text-black px-3 py-3 border-b border-black/5 transition-colors"
              >
                {item.label}
              </Link>
              {item.sub.length > 0 && (
                <div className="flex flex-col pl-6 bg-black/[0.02]">
                  {item.sub.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm font-normal text-black/60 hover:text-black px-3 py-2.5 border-b border-black/5 transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Shop button */}
        <div className="mt-8 px-3">
          <button className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black transition-all duration-200">
            Shop
          </button>
        </div>
      </div>
    </>
  )
}
