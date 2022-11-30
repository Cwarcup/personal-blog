/* eslint-disable prettier/prettier */
import {
  SiReact,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPython,
  SiGo,
  SiTailwindcss,
  SiRubyonrails,
  SiSass,
  SiGraphql,
  SiRedux,
  SiCypress,
  SiSupabase,
  SiFirebase,
  SiStorybook,
} from 'react-icons/si'

const languages = [
  {
    name: 'TypeScript',
    logo: SiTypescript,
  },
  {
    name: 'HTML',
    logo: SiHtml5,
  },
  {
    name: 'CSS',
    logo: SiCss3,
  },
  {
    name: 'JavaScript',
    logo: SiJavascript,
  },
  {
    name: 'React',
    logo: SiReact,
  },
  {
    name: 'Tailwind CSS',
    logo: SiTailwindcss,
  },
  {
    name: 'Nextjs',
    logo: SiNextdotjs,
  },
  {
    name: 'Node.js',
    logo: SiNodedotjs,
  },
  {
    name: 'Express',
    logo: SiExpress,
  },
  {
    name: 'PostgreSQL',
    logo: SiPostgresql,
  },
  {
    name: 'Python',
    logo: SiPython,
  },
  {
    name: 'Go',
    logo: SiGo,
  },
  {
    name: 'Ruby on Rails',
    logo: SiRubyonrails,
  },
  {
    name: 'Sass',
    logo: SiSass,
  },
  {
    name: 'GraphQL',
    logo: SiGraphql,
  },
  {
    name: 'Redux',
    logo: SiRedux,
  },
  {
    name: 'Cypress',
    logo: SiCypress,
  },
  {
    name: 'Supabase',
    logo: SiSupabase,
  },
  {
    name: 'Firebase',
    logo: SiFirebase,
  },
  {
    name: 'Storybook',
    logo: SiStorybook,
  },
]

const Skills = () => {
  return (
    <div className="mx-auto max-w-screen-lg pt-8 md:pb-10">
      <div className="flex flex-wrap">
        <div className="w-full max-w-full flex-shrink-0 lg:mt-2 lg:w-1/3 lg:flex-none">
          <h3 className="mb-3 text-3xl font-bold text-gray-200 xl:text-4xl">
            I'm a full-stack developer with a passion for building beautiful, intuitive, and
            accessible web applications.
          </h3>
          <p className="text-gray-400">Here are some of the tools I enjoying building with.</p>
        </div>
        <div className="w-full max-w-full py-10 lg:w-2/3 lg:flex-none lg:px-8 lg:py-0">
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
            {languages.map((language) => (
              <div className="group flex flex-col items-center justify-center" key={language.name}>
                <language.logo className="h-12 w-12 text-gray-200 group-hover:text-primary-600" />
                <p className="mt-2 text-center text-sm font-medium text-gray-200 group-hover:text-primary-600">
                  {language.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
