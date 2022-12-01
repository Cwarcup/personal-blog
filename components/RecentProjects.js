import projectsData from '@/data/projectsData'

import ProjectCard from '@/components/ProjectCard'
import AnimatedDiv from '@/components/framer-motion/AnimatedDiv'
import { FadeContainer } from '../lib/FramerMotionVariants'
import AnimatePresence from 'framer-motion'

const RecentProjects = ({ MAX_PROJECTS }) => {
  const projectsList = projectsData.slice(0, MAX_PROJECTS)

  return (
    <>
      <div className="divide-y divide-gray-700">
        <div className="my-4">
          <span className="font-poppins title-font text-3xl font-bold">Recent Projects</span>
        </div>
        <div className="py-5">
          <AnimatedDiv
            variants={FadeContainer}
            className="mx-auto grid grid-cols-1 gap-4 md:ml-[20%] xl:ml-[24%]"
          >
            {/* <AnimatePresence>
              {projectsList.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  imgSrc={project.imgSrc}
                />
              ))}
            </AnimatePresence> */}
            {projectsList.map((d, index) => (
              <ProjectCard
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                tools={d.tools}
              />
            ))}
          </AnimatedDiv>
        </div>
      </div>
    </>
  )
}

export default RecentProjects
