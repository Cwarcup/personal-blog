import Image from 'next/image'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { Analytics } from '@vercel/analytics/react'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/social-icons'
import portraitImage from '../public/static/images/avatar.jpg'

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
          content="Hi, I'm Curtis Warcup. I'm a software engineer and a lifelong learner. I'm passionate about building great software and sharing what I learn along the way."
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
              I’m Curtis Warcup. I live in rainy Vancouver, BC.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I’ve always loved taking things apart, figuring out how they work, and putting them
                back together (or not—sorry Mom & Dad). This curiosity led me to become a lifelong
                learner, and I’m passionate about building great websites and sharing what I learn
                along the way.
              </p>
              <p>
                I began my professional journey at Apple, where I rose from a part-time sales
                position to an Associate Manager. In this role, I oversaw product launches,
                conducted training, and led a team of over 100 employees. I thrived in this
                fast-paced environment, handling complex technical issues as a Genius and managing
                store operations as a Lead.
              </p>
              <p>
                My transition to web development was inspired by my wife, who suggested I learn
                something new. After self-studying for eight months, I enrolled in a 12-week
                bootcamp at Lighthouse Labs. This intensive program honed my skills in full-stack
                development.
              </p>
              <p>
                Currently, I work as a web developer at 14 Oranges, where I contribute to a wide
                variety of projects, including municipal websites, lawyer platforms, large online
                stores, and financial platforms. I specialize in PHP, JavaScript, and CSS, and
                frequently use WordPress, Laravel, Vue, Next.js, React, and Tailwind CSS in my work.
              </p>
              <p>
                My journey in web development is driven by a desire to continuously learn, tackle
                new challenges, and collaborate with talented teams. I’m always looking for
                opportunities to grow and expand my knowledge in the tech industry.
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
                curtis.gwarcup@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
      <Analytics />
    </>
  )
}
