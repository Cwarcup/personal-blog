import ToolsGrid from '/components/ToolsGrid'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '/data/siteMetadata'
import { HeartIcon } from '@heroicons/react/solid'

export default function Tools() {
  return (
    <>
      <PageSEO title={`Tools - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-700">
        <div className="flex flex-col items-center ">
          <div className="space-y-2 pt-6 pb-3 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Tools
            </h1>
          </div>
          <p className="flex pb-3">
            Some tools that I find useful
            <HeartIcon className="ml-2 -mr-1 h-5 w-5 text-logoColor" aria-hidden="true" />
          </p>
        </div>

        <div className="container py-12">
          <div className="-m-4 flex flex-wrap justify-center">
            <ToolsGrid filter="ios" />
          </div>
        </div>
      </div>
    </>
  )
}
