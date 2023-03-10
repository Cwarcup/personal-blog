import Link from 'next/link'
import { useState } from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoMail, IoCall } from 'react-icons/io5'
import Notification from './Notification'

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="-m-1 p-1 " {...props}>
      <Icon className="h-6 w-6 cursor-pointer fill-gray-500 transition hover:fill-gray-200" />
    </Link>
  )
}

function CopyToClipboard({ icon: Icon, text, ...props }) {
  const [show, setShow] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(text.contact)
    setShow(!show)

    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  return (
    <div className="-m-1 p-1 " {...props}>
      <Icon
        className="h-6 w-6 cursor-pointer fill-gray-500 transition hover:fill-gray-200"
        onClick={handleClick}
      />
      <Notification show={show} setShow={setShow} text={text} />
    </div>
  )
}

export default function Hero() {
  return (
    <div className="mb-5 max-w-2xl">
      <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-zinc-100 sm:text-5xl">
        Android developer, building high quality android apps.
      </h1>
      <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
        Hi, I'm Musyoka Muasya, a software engineer (mobile heavy).
        <br />
        <br />
        As an Android developer with a passion for creating sleek, functional apps, I've crafted
        intuitive interfaces for Immicart, BossLady, ewave, and more. With a deep understanding of
        backend APIs and a focus on user experience, I strive to deliver cutting-edge mobile
        solutions that exceed expectations.
        <br />
        <br />I am working on solutions that have the power to impact millions of people around the
        world. Through my work, I'm constantly pushing the boundaries of what's possible, leveraging
        cutting-edge technologies to build software that is both innovative and impactful. I take
        pride in the fact that my work is helping to make a real difference in people's lives.
      </p>
      <div className="mt-6 flex gap-6">
        <SocialLink
          href="https://github.com/musyokamuasya"
          aria-label="Check out my Github"
          icon={IoLogoGithub}
        />
        <SocialLink
          href="https://www.linkedin.com/in/musyokamuasya/"
          aria-label="Connect with me on LinkedIn"
          icon={IoLogoLinkedin}
        />
        <CopyToClipboard
          text={{ contact: 'musyokamuasya@gmail.com', type: 'Email' }}
          aria-label="Send me an email"
          icon={IoMail}
        />
        <CopyToClipboard
          text={{ contact: '+254 727 169139', type: 'Phone number' }}
          aria-label="Give me a call"
          icon={IoCall}
        />
      </div>
    </div>
  )
}
// <div className="flex flex-col w-full">
//   <div className="pb-4 space-y-2 text-center md:space-y-5 md:text-left">
//     <PageTitle>Web Developer, Tech Enthusiast, and Fitness Junkie</PageTitle>
//     <p className="pb-4 text-lg leading-7 prose text-gray-400 max-w-none">
//       Technology enthusiast experienced in consumer electronics industry. I believe the optimal
//       code is achieved when the user and development experience is frictionless and intuitive.{' '}
//       <Link href={`mailto:${siteMetadata.email}`}>
//         <a
//           className="font-medium leading-6 "
//           aria-label={`Email to ${siteMetadata.email}`}
//           title={`Email to ${siteMetadata.email}`}
//         >
//           Get in touch &rarr;
//         </a>
//       </Link>
//     </p>
//   </div>
// </div>
