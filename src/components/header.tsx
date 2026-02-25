'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  {
    label: 'Study room',
    sub: ['Lounge Chairs', 'Chairs', 'Tables', 'Contact'],
  },
  { label: 'Dining', sub: [] },
  { label: 'Bedroom', sub: [] },
  { label: 'Living Room', sub: ['Chairs', 'Contact'] },
  { label: 'Planters', sub: [] },
]

export function Header() {
  const [navState, setNavState] = useState<'top' | 'scrolling' | 'hidden'>(
    'top'
  )
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const y = window.scrollY
      if (y <= 0) {
        setNavState('top')
      } else if (y < heroHeight * 0.9) {
        setNavState('scrolling')
      } else {
        setNavState('hidden')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 transition-all duration-500 ease-in-out
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

      {/* Navigation */}
      <nav className="relative flex-1 hidden lg:flex justify-center gap-12 text-sm font-normal text-black/90">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(item.label)}
            onMouseLeave={() => setHovered(null)}
          >
            <a
              href="#"
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

      {/* Shop Button */}
      <div className="relative flex items-center">
        <button className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-lime-300 hover:text-black hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg">
          Shop
        </button>
      </div>
    </header>
  )
}
