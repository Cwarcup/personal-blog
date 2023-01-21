/* eslint-disable prettier/prettier */

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Hero from '@/components/Hero'
import RecentProjects from '@/components/RecentProjects'
import Skills from '@/components/Skills'
import { Analytics } from '@vercel/analytics/react'

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

        <div className="grid gap-5 sm:mt-6 sm:pt-10 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            const firstTwoTags = tags.slice(0, 2)
            return (
              <div key={slug} className="relative h-full rounded-lg">
                <Link
                  href={`/blog/${slug}`}
                  className="relative block h-full overflow-hidden rounded-lg bg-darkSecondary p-4"
                >
                  <div className="h-full">
                    <p className="text-sm text-gray-500">
                      <time dateTime={date}>{formatDate(date)}</time>
                    </p>
                    <h1 className="mt-2 mb-2 block font-bold text-gray-100">{title}</h1>

                    <p className="mt-3 h-auto text-sm text-gray-300">{summary}</p>
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
      <Analytics />
    </>
  )
}
