import SectionContainer from './SectionContainer'
import Footer from './Footer'
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
