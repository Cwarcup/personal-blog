import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo-header.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useRef, useState } from 'react'

const LayoutWrapper = ({ children }) => {
  const [stuck, setStuck] = useState(false)
  const ref = useRef()

  const stuckClasses =
    'py-2 sticky top-n-1 z-50 transition-all backdrop isSticky mx-auto border-b border-slate-300/10 mb-8 w-full'
  const unstuckClasses =
    'py-2 md:py-8 sticky top-n-1 z-50 transition-all backdrop mx-auto border-b border-b-0 border-slate-300/10 mb-8 w-full'

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
        <div className="mx-auto flex max-w-3xl items-center justify-between bg-cardBg bg-opacity-5 px-4 sm:px-6 xl:max-w-5xl xl:px-0">
          <Link href="/" aria-label="Curtis Warcup">
            <div className="mr-3">
              <Logo />
            </div>
          </Link>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => {
                if (link.type !== 'dropdown') {
                  return (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="p-1 font-bold text-gray-100 hover:text-primary-400 sm:p-4"
                    >
                      {link.title}
                    </Link>
                  )
                }
                if (link.type === 'dropdown') {
                  return (
                    <Menu as="a" className="relative inline-block p-1 sm:p-4">
                      <div>
                        <Menu.Button className="inline-flex justify-center rounded-md bg-transparent font-bold text-gray-100 hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          Other
                          <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-24 origin-top-right divide-y divide-gray-600 rounded-md bg-cardBg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {link.links.map((item, index) => (
                            <div key={index} className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${
                                      active ? 'text-primary-400' : 'text-gray-100'
                                    } group flex w-full justify-center  rounded-md px-2 py-2 font-bold`}
                                  >
                                    <Link href={item.href}>{item.title}</Link>
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )
                }
              })}
            </div>
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
