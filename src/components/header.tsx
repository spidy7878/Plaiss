'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  {
    label: 'Study room',
    sub: ['Lounge Chairs', 'Chairs', 'Tables', 'Contact'],
  },
  { label: 'Dining', sub: [] },
  { label: 'Bedroom', sub: [] },
  { label: 'Living Room', sub: [] },
  { label: 'Planters', sub: [] },
]

export function Header() {
  const [navState, setNavState] = useState<'top' | 'scrolling' | 'hidden'>(
    'top'
  )
  const [hovered, setHovered] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <div className="relative flex items-center">
          <span className="text-4xl font-black font-(family-name:--font-montserrat) tracking-[-0.07em] uppercase leading-none text-black">
            P
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="relative flex-1 hidden lg:flex justify-center gap-12 text-sm font-normal text-black/90">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <a
                href={item.label === 'Planters' ? '/planters' : '#'}
                className={`relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full hover:text-black transition-colors px-2 py-1 ${
                  hovered === item.label ? 'text-blue-600' : ''
                }`}
              >
                {item.label}
              </a>
              {item.sub.length > 0 && hovered === item.label && (
                <div
                  className={`absolute top-full left-0 mt-2 min-w-95 w-105 grid grid-cols-2 gap-x-40 gap-y-4 py-4 pr-16 pl-6 rounded z-50
                    ${
                      navState === 'scrolling'
                        ? 'backdrop-blur-md bg-transparent border-none shadow-none'
                        : 'bg-white shadow-xl'
                    }
                  `}
                >
                  {item.sub.map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className={`text-base whitespace-nowrap px-2 py-1 rounded transition-colors
                        ${navState === 'scrolling' ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/5'}`}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side: Shop + Hamburger */}
        <div className="relative flex items-center gap-4">
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
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-8 lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <a
                  href={item.label === 'Planters' ? '/planters' : '#'}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-normal text-black"
                >
                  {item.label}
                </a>
                {item.sub.length > 0 && (
                  <div className="flex flex-col gap-2 pl-4 border-l border-black/20">
                    {item.sub.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        onClick={() => setMobileOpen(false)}
                        className="text-base text-black/60 hover:text-black transition-colors"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
