import Image from 'next/image'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { Analytics } from '@vercel/analytics/react'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/social-icons'
import portraitImage from '../public/static/images/avatar.png'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className="flex">
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-primary-500 dark:text-zinc-200 dark:hover:text-primary-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-primary-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  const { author, email, linkedin, github } = siteMetadata
  return (
    <>
      <Head>
        <title>{`About - ${author}`}</title>
        <meta
          name="description"
          content="Hi, I'm Musyoka Muasya. I'm a software engineer and a lifelong learner. I'm passionate about building great software and sharing what I learn along the way."
        />
      </Head>
      <Container className="mt-10">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="portrait of Curtis Warcup"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Musyoka Muasya. Software Engineer.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I've always loved taking apart things, figuring out how they work, and putting them
                back together (or not, sorry Mom & Dad). I've been a lifelong learner, and I'm
                passionate about building great websites and sharing what I learn along the way.
              </p>
              <p>
                During my time at the University of British Columbia, I studied Kinesiology (the
                study of human movement) while I worked towards applying to medical school. After an
                unsuccessful application cycle, I decided to take a year off and work at Apple as an
                iPhone repair technician. This was an exciting time since Apple was offering their
                iPhone battery replacement program for $29, and I was able to help hundreds of
                customers save hundreds of dollars. I also got to work with some of the most
                talented people I've ever met, and I learned a lot about customer service and how to
                work with a team.
              </p>
              <p>
                I fell in love with the fast-paced environment of Apple and moved into a role as a
                Genius where I learnt how to handle complex technical issues and navigate difficult
                customer interactions. I quickly moved into a middle management role as a Lead and
                was responsible for all the daily operations of the store. I was able to learn a lot
                about how to manage a team, manage a budget, prioritize effectively and deal with
                ambiguity.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href={github} icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href={linkedin} icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href={`mailto:${email}`}
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                Let's Connect
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
      <Analytics />
    </>
  )
}
