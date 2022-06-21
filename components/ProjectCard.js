import Image from './Image'
import Link from './Link'

const ProjectCard = ({ title, description, imgSrc, href }) => (
  <div className="group rounded-lg ">
    <Link href={href}>
      <div className="grid items-center gap-3 overflow-hidden rounded-lg bg-transparent py-2  md:grid-cols-2 md:grid-rows-1">
        <Image
          alt={title}
          src={imgSrc}
          className="absolute inset-0 col-start-1 col-end-2 row-start-1 h-full w-full rounded-lg object-cover md:col-span-2 md:col-start-1 md:row-span-1"
          width="300px"
          height="250px"
        />
        <div className="py-4 px-2 md:col-span-2 md:col-start-2 md:row-span-1">
          <h2 className="mt-2 mb-2 font-bold text-gray-100 md:text-xl">{title}</h2>
          <p className="text-sm tracking-wider text-gray-300">{description}</p>
        </div>
      </div>
    </Link>
  </div>
)

export default ProjectCard
