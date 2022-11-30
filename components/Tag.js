import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="text-sm font-medium uppercase hover:text-primary-600 ">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
