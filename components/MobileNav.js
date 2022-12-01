import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { ChevronRightIcon } from '@heroicons/react/solid'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        {navShow ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform cursor-pointer select-none rounded-md duration-300 active:scale-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform cursor-pointer select-none rounded-md duration-300 active:scale-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
      <div
        className={`fixed top-24 right-0 z-10 -mt-6 h-[96rem] w-full transform bg-gray-800 opacity-95 duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed h-[16rem] w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link, i) => {
            if (link.type !== 'dropdown') {
              return (
                <div key={`${link}-${i}`} className="flex items-center px-12 py-4">
                  <Link
                    href={link.href}
                    className="mono-type text-2xl font-bold tracking-widest text-gray-100"
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                  <Link href={link.href}>
                    <ChevronRightIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              )
            }

            return (
              <div key={`${link}-${i}`}>
                {link.links.map((item, i) => (
                  <div key={`${item.href}-${i}`} className="flex items-center px-12 py-4">
                    <Link
                      href={item.href}
                      className="mono-type text-2xl font-bold tracking-widest text-gray-100"
                      onClick={onToggleNav}
                    >
                      {item.title}
                    </Link>
                    <Link href={item.href}>
                      <ChevronRightIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
