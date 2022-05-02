import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Header from './Header'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      <Header />
      <SectionContainer>
        <div className="flex h-screen flex-col justify-between">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </SectionContainer>
    </>
  )
}

export default LayoutWrapper

// const LayoutWrapper = ({ children }) => {
//   const isTop = useIsScrollTop()
//   return (
//     <SectionContainer>
//       <div className=" flex h-screen flex-col justify-between">
//         <header
//           className={`sticky top-0 z-20 flex w-full items-center justify-between py-10 ${
//             isTop ? 'border-none' : 'border-b border-gray-200 dark:border-gray-800'
//           } firefox:bg-opacity-100 dark:firefox:bg-opacity-100 bg-white bg-opacity-30 backdrop-blur-lg backdrop-saturate-150 backdrop-filter dark:bg-black dark:bg-opacity-30`}
//         ></header>
