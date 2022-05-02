import headerNavLinks from '@/data/headerNavLinks'
import Link from './CustomLink'
import { useEffect, useState } from 'react'
import MenuButton from './MenuButton'

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
        className={`sticky top-0 z-20 flex w-full items-center justify-between py-10  ${
          isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800'
        } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-black dark:bg-opacity-30`}
      >
        <nav className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 sm:px-6 sm:py-2 xl:max-w-3xl xl:px-0">
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block sm:space-x-8">
              {headerNavLinks
                .filter((l) => !l.onlyMobile)
                .map((link) => (
                  <Link
                    key={link.title}
                    title={link.title}
                    href={link.href}
                    className="font-medium text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.title}
                  </Link>
                ))}
            </div>
            <div className="flex items-center sm:hidden">
              <MenuButton onClick={onMenuToggle} isOpened={menuShow} />
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile side menu */}
      <div
        className={`fixed right-0 z-20 h-screen w-full transform bg-white duration-500 ease-in-out dark:bg-black sm:hidden ${
          menuShow ? 'translate-x-0' : ' -translate-x-full'
        } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-opacity-30`}
      >
        <nav className="mt-8 h-full space-y-8">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12">
              <Link
                href={link.href}
                title={link.title}
                className="text-xl font-semibold leading-8 tracking-wide text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                onClick={onMenuToggle}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
