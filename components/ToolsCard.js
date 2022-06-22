import Image from './Image'
import Link from './Link'

const ToolsCard = ({ name, description, link, id, labels }) => {
  const imgPath = `/public/static/images/toolsImages/${id}.png`

  return (
    <div
      key={id}
      className="group bg-day relative h-full transform rounded-lg transition duration-500 hover:scale-105 "
    >
      <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-green-600 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
      <a className="card-c relative grid h-full  grid-cols-[86px,_1fr] content-center justify-items-start rounded-lg bg-cardBg  pl-10 md:pl-2">
        <div className="group relative rounded-lg py-4 px-2">
          <Link href={link}>
            <span>
              <Image
                alt={id}
                src={`/static/images/toolsImages/${id}.png`}
                className=""
                width="68px"
                height="68px"
              />
            </span>
          </Link>
        </div>
        <div className="h-full py-4 px-2">
          <h2 className="font-bold md:text-xl">
            <Link href={link} className="text-gray-100">
              {name}
            </Link>
          </h2>
          <p className="h-auto text-sm tracking-wider text-gray-300">{description}</p>
          <span className="my-2 inline-flex w-full items-center justify-between">
            <span className="inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium">
              {labels.map((tag) => (
                <a
                  key={tag}
                  className="mr-3 text-xs font-medium uppercase  hover:text-primary-600 "
                >
                  {tag.split(' ').join('-')}
                </a>
              ))}
            </span>
          </span>
        </div>
      </a>
    </div>
  )
}

export default ToolsCard
