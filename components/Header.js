import headerNavLinks from '@/data/headerNavLinks'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import Logo from '@/data/logo.svg'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'

function useIsScrollTop() {
  const [isTop, setIsTop] = useState(true)
  useEffect(() => {
    function onScroll() {
      setIsTop(window.scrollY <= 0)
    }
    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return isTop
}

function useToggleMenu() {
  const [menuShow, setMenuShow] = useState(false)
  const onMenuToggle = () => {
    setMenuShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }
  return [menuShow, onMenuToggle]
}

export default function Header() {
  const [menuShow, onMenuToggle] = useToggleMenu()
  const isTop = useIsScrollTop()

  return (
    <>
      <header
        className={`sticky top-0 z-20 flex w-full items-center justify-between py-6  ${
          isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800'
        } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-gray-900 dark:bg-opacity-30`}
      >
        <nav className="mx-auto flex w-full max-w-2xl items-center justify-between sm:py-2 xl:max-w-3xl">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </nav>
      </header>
    </>
  )
}
