import Image from './Image'
import Link from './Link'
import { BsGithub } from 'react-icons/bs'
import { MdOutlineLink } from 'react-icons/md'

const ProjectCard = ({ title, description, imgSrc, href, tools, deployed }) => (
  <div className="card">
    <div className="relative -mt-[35%] w-full shrink-0 overflow-hidden rounded-xl shadow-2xl before:absolute before:inset-0 before:z-10 before:bg-black/20 sm:-mt-0 sm:w-1/2 md:-ml-[35%] md:w-8/12">
      <Image
        title={title}
        alt={title}
        src={imgSrc}
        width={1200}
        height={630}
        layout="responsive"
        placeholder="blur"
        objectFit="cover"
        blurDataURL={imgSrc}
        quality={50}
        className="backdrop-blur-xl transition-all duration-300 lg:group-hover:scale-110"
      />
    </div>

    <div className="flex flex-col justify-start gap-3">
      <h1 className="font-bold capitalize text-neutral-200">{title}</h1>
      <p className="truncate-2 text-sm text-neutral-400">{description}</p>

      <div className="flex flex-wrap items-center gap-1">
        {tools.map((tool, index) => (
          <span key={`${tool}-${index}`} className="bg-gray-900 px-2 py-1 text-xs text-gray-500">
            {tool}
          </span>
        ))}
      </div>

      <div className="mt-auto flex w-fit items-center gap-4 p-2">
        {href && (
          <Link href={href}>
            <a
              title="Source Code on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              href={href}
              className="text-gray-500 hover:text-white"
            >
              <BsGithub className="h-6 w-6 transition-all hover:scale-110 active:scale-90" />
            </a>
          </Link>
        )}

        {deployed && (
          <Link href={deployed}>
            <a
              title="Live Preview"
              target="_blank"
              rel="noopener noreferrer"
              href={deployed}
              className="text-gray-500 hover:text-white"
            >
              <MdOutlineLink className="h-6 w-6 transition-all hover:scale-110 active:scale-90" />
            </a>
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default ProjectCard
