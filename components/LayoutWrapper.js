import { useState, useEffect, useRef } from 'react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  const [stuck, setStuck] = useState(false)
  const ref = useRef()

  const stuckClasses =
    'py-2 sticky top-n-1 z-50 transition-all backdrop isSticky mx-auto border-b border-slate-900/10 dark:border-slate-300/10 mb-16 w-full'
  const unstuckClasses =
    'py-2 md:py-8 sticky top-n-1 z-50 transition-all backdrop mx-auto border-b border-b-0 border-slate-900/10 dark:border-slate-300/10 mb-16 w-full'

  const classes = stuck ? stuckClasses : unstuckClasses

  useEffect(() => {
    const cachedRef = ref.current
    const observer = new IntersectionObserver(
      ([e]) => {
        setStuck(e.intersectionRatio < 1)
      },
      { threshold: [1.0] }
    )
    observer.observe(cachedRef)
    return () => observer.unobserve(cachedRef)
  }, [ref])

  return (
    <>
      <header className={classes} ref={ref}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <div>
            <Link href="/" aria-label="rooks blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="title mono-type hidden text-2xl font-semibold hover:text-primary-600 dark:hover:text-primary-400 sm:block">
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
                  className="p-1 font-bold text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </header>
      <SectionContainer>
        <main className="mb-auto">{children}</main>
        <Footer />
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper
