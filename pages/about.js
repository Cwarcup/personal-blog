import Image from 'next/image'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import Link from '@/components/Link'
import { Analytics } from '@vercel/analytics/react'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@/components/social-icons'
import portraitImage from '../public/static/images/avatar.jpg'

import {
  FaCommentDots,
  FaUsers,
  FaBrain,
  FaHandshake,
  FaClock,
  FaAdjust,
  FaChalkboardTeacher,
  FaLightbulb,
  FaHeart,
} from 'react-icons/fa'

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

const softSkills = [
  { name: 'Communication', icon: FaCommentDots },
  { name: 'Team Collaboration', icon: FaUsers },
  { name: 'Problem-Solving', icon: FaBrain },
  { name: 'Client Relations', icon: FaHandshake },
  { name: 'Time Management', icon: FaClock },
  { name: 'Adaptability', icon: FaAdjust },
  { name: 'Leadership', icon: FaChalkboardTeacher },
  { name: 'Critical Thinking', icon: FaLightbulb },
  { name: 'Empathy', icon: FaHeart },
]

function SoftSkill({ skill }) {
  const { name, icon: Icon } = skill
  return (
    <div className="flex items-center space-x-4">
      <Icon className="h-6 w-6 text-primary-500" />
      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{name}</span>
    </div>
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
                At 14 Oranges, I specialize in building responsive and accessible web applications,
                collaborating directly with clients from diverse industries, including healthcare. I
                pride myself on breaking down complex technical concepts into easily understandable
                terms, ensuring client satisfaction and fostering strong working relationships. I
                lead projects from inception to deployment, ensuring robust performance and
                reliability.
              </p>
              <p>
                My experience at Apple taught me how to handle ambiguity and make quick, innovative
                decisions in the face of unclear solutions. I balanced customer satisfaction with
                business goals, often leading to creative problem-solving and effective conflict
                resolution.
              </p>
              <p>
                Outside of work, I'm passionate about health and wellness, stemming from my
                background in Kinesiology. This interest drives my enthusiasm for creating impactful
                solutions in the healthcare sector. I'm excited about the future of digital health
                and look forward to contributing to projects that make a real difference in people's
                lives.
              </p>
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
              My Soft Skills
            </h2>
            <div className="mt-6 space-y-4">
              {softSkills.map((skill) => (
                <SoftSkill key={skill.name} skill={skill} />
              ))}
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
