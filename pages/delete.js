import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { RoughNotation } from 'react-rough-notation'
import Image from '@/components/Image'
import ShortcutHome from '@/components/ShortcutHome'

import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="mb-2 text-2xl font-extrabold leading-11 tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                I'm <span className="text-primary-color dark:text-primary-color-dark">Einar</span>,
                a curious software developer who's trying to get a bit better every day
              </h1>
            </div>
            <div>
              <Image
                src="/static/images/einar-avatar-new.jpg"
                alt="avatar"
                width="384px"
                height="384px"
                className=" [clip-path:polygon(0%_0%,100%_0%,50%_100%,0%_50%)]"
              />
            </div>
          </div>
          <p className="text-lg leading-7 text-slate-600 dark:text-slate-300">
            This is my place for{' '}
            <RoughNotation
              type="underline"
              show={true}
              color="#fff176"
              animationDelay={800}
              animationDuration={1200}
            >
              thoughts,{' '}
            </RoughNotation>
            <RoughNotation
              type="underline"
              show={true}
              color="#ADD8E6"
              animationDelay={1400}
              animationDuration={1200}
            >
              reflections,{' '}
            </RoughNotation>
            &{' '}
            <RoughNotation
              type="underline"
              show={true}
              color="#FF0000"
              animationDelay={1700}
              animationDuration={1200}
            >
              everything{' '}
            </RoughNotation>
            in between
          </p>
          <div className="flex w-full justify-center">
            <div className="mt-2 justify-center">
              <ShortcutHome />
            </div>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-slate-600 dark:text-slate-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-slate-800 dark:text-slate-200"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-slate-600 dark:text-slate-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-color dark:text-primary-color-dark hover:text-blue-600 dark:hover:text-yellow-300"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-color dark:text-primary-color-dark hover:text-blue-600 dark:hover:text-yellow-300"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {/* {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )} */}
    </>
  )
}
