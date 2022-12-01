/* eslint-disable prettier/prettier */

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Hero from '@/components/Hero'
import RecentProjects from '@/components/RecentProjects'
import Skills from '@/components/Skills'

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
      <Skills />
      <RecentProjects MAX_PROJECTS="4" />

      <div className="container mx-auto divide-y divide-gray-700">
        <div className="my-4 flex flex-col">
          <span className="font-poppins title-font text-3xl font-bold">Recent Posts</span>
        </div>

        <div className="mt-6 grid gap-16 pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags, images } = frontMatter
            const firstTwoTags = tags.slice(0, 2)
            return (
              <div
                key={slug}
                className="group relative h-full transform rounded-lg transition duration-500 hover:scale-105"
              >
                <div className="animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-green-600 to-amber-500 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <Link
                  href={`/blog/${slug}`}
                  className="relative block h-full overflow-hidden rounded-lg bg-cardBg p-4"
                >
                  <div className="h-full">
                    <p className="text-sm text-gray-500">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </p>
                    <div className="mt-2 mb-2 block font-bold md:text-xl">
                      <Link href={`/blog/${slug}`} className="font-semibold text-gray-100">
                        {title}
                      </Link>
                    </div>

                    <p className="mt-3 h-auto text-sm tracking-wider text-gray-300">{summary}</p>
                  </div>
                </Link>
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
