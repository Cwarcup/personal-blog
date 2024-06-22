import { motion } from 'framer-motion'
import { showHoverAnimation, removeHoverAnimation } from '../lib/windowAnimation'
import { popUp } from '../lib/FramerMotionVariants'

const Button = ({ href, children }) => {
  return (
    <motion.a
      href={href}
      download
      variants={popUp}
      initial="hidden"
      animate="visible"
      onMouseMove={(e) => showHoverAnimation(e)}
      onMouseLeave={(e) => removeHoverAnimation(e)}
      className="max-w-330 dark:bg-darkPrimary group flex items-center justify-center gap-4 rounded-sm border border-gray-300 px-4 py-2 text-base font-semibold text-gray-800 transition hover:bg-gray-200 dark:border-neutral-700 dark:text-white dark:hover:bg-darkSecondary"
    >
      {children}
    </motion.a>
  )
}

export default Button