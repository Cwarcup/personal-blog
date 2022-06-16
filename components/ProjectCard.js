import Image from './Image'
import Link from './Link'
import { motion } from 'framer-motion'

const ProjectCard = ({ title, description, imgSrc, href }) => (
  <div className="group rounded-lg ">
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className=" grid grid-cols-2 grid-rows-1 items-center gap-3 overflow-hidden rounded-lg  bg-transparent py-2"
    >
      <Image
        alt={title}
        src={imgSrc}
        className="absolute inset-0 h-full w-full rounded-lg object-cover  "
        width="300px"
        height="250px"
      />
      <div className=" row-span-1 py-4 px-2">
        <h2 className="mt-2 mb-2 font-bold md:text-xl">
          <Link href={href} className="dark:text-gray-100">
            {title}
          </Link>
        </h2>
        <p className="text-sm tracking-wider dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  </div>
)

export default ProjectCard
