import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import Hero from '@/components/Hero'

const MAX_DISPLAY = 4

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <Hero />
      <div className="container mx-auto">
        <div className="my-4 flex flex-col">
          <span className="font-poppins title-font text-3xl font-bold">Previous Posts</span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            return (
              <div
                key={slug}
                className="group bg-day w-full rounded-lg bg-opacity-50 dark:bg-slate-700 dark:bg-opacity-30 "
              >
                <div className="c-card block transform overflow-hidden rounded-lg  bg-transparent transition duration-500 group-hover:scale-105">
                  <div className="relative max-h-4 overflow-hidden rounded-lg pb-60">
                    <span>
                      <img
                        alt={title}
                        src={images}
                        className="absolute inset-0 h-full w-full  object-cover "
                      />
                    </span>
                  </div>
                  <div className="py-4 px-2">
                    <span className="inline-flex w-full items-center justify-between">
                      <span className="inline-block rounded border border-gray-700 py-1 px-2 text-xs font-medium">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </span>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </span>
                    <h2 className="mt-2 mb-2 font-bold md:text-xl">
                      <Link href={`/blog/${slug}`} className="dark:text-gray-100">
                        {title}
                      </Link>
                    </h2>
                    <p className="text-sm tracking-wider dark:text-gray-300">{summary}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/posts"
              className="text-primary-500 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
