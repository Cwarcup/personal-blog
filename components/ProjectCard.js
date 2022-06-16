import Image from './Image'
import Link from './Link'

const ProjectCard = ({ title, description, imgSrc, href }) => (
  <div className="group bg-day  w-full  rounded-lg bg-opacity-50 dark:bg-slate-700 dark:bg-opacity-30 ">
    <div className=" grid transform grid-cols-2 grid-rows-1 overflow-hidden rounded-lg  bg-transparent transition duration-500 group-hover:scale-105">
      <div className="relative row-span-1 max-h-4 overflow-hidden rounded-lg pb-60">
        <Image
          alt={title}
          src={imgSrc}
          className="absolute inset-0 h-full w-full  object-cover "
          width="300px"
          height="250px"
        />
      </div>
      <div className=" row-span-1 py-4 px-2">
        <h2 className="mt-2 mb-2 font-bold md:text-xl">
          <Link href={href} className="dark:text-gray-100">
            {title}
          </Link>
        </h2>
        <p className="text-sm tracking-wider dark:text-gray-300">{description}</p>
      </div>
    </div>
  </div>
)

export default ProjectCard
