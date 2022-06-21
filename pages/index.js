import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import Hero from '@/components/Hero'
import RecentProjects from '@/components/RecentProjects'

const MAX_DISPLAY = 6

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      <RecentProjects MAX_PROJECTS="2" />
      <div className="container mx-auto divide-y divide-gray-700">
        <div className="my-4 flex flex-col">
          <span className="font-poppins title-font  text-3xl font-bold">Recent Posts</span>
        </div>
        <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
              <div
                key={slug}
                className="group bg-day relative h-full transform rounded-lg transition duration-500 hover:scale-105"
              >
                <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-green-600 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <a className="c-card relative block h-full overflow-hidden rounded-lg bg-cardBg">
                  <div className="group relative max-h-4 overflow-hidden rounded-lg pb-60">
                    <Link href={`/blog/${slug}`}>
                      <span>
                        <img
                          alt={title}
                          src={images}
                          className="absolute inset-0 h-full w-full  object-cover "
                        />
                      </span>
                    </Link>
                  </div>
                  <div className="h-full py-4 px-2">
                    <span className="inline-flex w-full items-center justify-between">
                      <span className="inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </span>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </span>
                    <h2 className="mt-2 mb-2 font-bold md:text-xl">
                      <Link href={`/blog/${slug}`} className="text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <p className="h-auto text-sm tracking-wider text-gray-300">{summary}</p>
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        {posts.length > MAX_DISPLAY && (
          <div className="mt-5 flex justify-end text-base font-medium leading-6">
            <Link href="/posts" className="mt-5 hover:text-primary-400" aria-label="all posts">
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
