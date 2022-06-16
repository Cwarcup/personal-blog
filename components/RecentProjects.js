import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import ProjectCard from '@/components/ProjectCard'

const RecentProjects = ({ MAX_PROJECTS }) => {
  const projectsList = projectsData.slice(0, MAX_PROJECTS)

  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="my-4">
          <span className="font-poppins title-font text-3xl font-bold">Recent Projects</span>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-1 grid-rows-2 gap-8 py-1">
            {projectsList.map((d, index) => (
              <div className="my-2 grid items-start gap-8" key={index}>
                <div className="group relative">
                  <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-green-600 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                  <a className="relative flex items-center divide-x divide-gray-600 rounded-lg bg-white px-4 py-4 leading-none dark:bg-[#0F141A] ">
                    <span className="flex items-center justify-center space-x-5">
                      <span className=" text-gray-900  dark:text-gray-100">
                        <ProjectCard
                          title={d.title}
                          description={d.description}
                          imgSrc={d.imgSrc}
                          href={d.href}
                        />
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default RecentProjects
