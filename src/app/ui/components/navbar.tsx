"use client"
import { cn, useIsMobile } from "@/utils/utils"

import Link from "next/link"
import { FaRegCompass } from "react-icons/fa"

import { motion, useMotionValueEvent, useScroll } from "motion/react"

import { Variants } from "motion"
import { useState } from "react"

interface NavbarProps {
  className?: string
}
const navbarVariants: Variants = {
  initial: {
    opacity: 0,
    y: -100,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
  desktop: {
    opacity: 1,
    y: 0,
  },
}

export const Navbar = ({ className }: NavbarProps) => {
  const isMobile = useIsMobile()

  const { scrollY } = useScroll()
  const [navTrigger, setNavTrigger] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 100 && isMobile) {
      setNavTrigger(true)
    } else {
      setNavTrigger(false)
    }
  })

  console.log(navTrigger)
  return (
    <motion.div
      animate={isMobile ? (navTrigger ? "enter" : "exit") : "desktop"}
      variants={navbarVariants}
      className={cn(
        "sticky top-6 z-50 max-w-[95vw] h-14 bg-white/80 rounded-full w-full mx-auto flex justify-center sm:justify-between px-4 sm:px-20 text-foreground items-center font-medium flex-col sm:flex-row py-8 sm:py-4 ",
        isMobile && "gap-y-1",
        className
      )}>
      <div className='flex items-center gap-x-10'>
        <FaRegCompass
          className={cn(
            "size-8 text-foreground",
            isMobile && "absolute left-4 top-4"
          )}
        />
        <span className='hidden sm:block'>
          September 5<sup>th</sup> - 14<sup>th</sup>
        </span>
      </div>
      <div className='flex items-center gap-x-10 font-semibold sm:font-medium'>
        <Link href='#hours'>Open Hours</Link>
        <Link href='#program'>Program</Link>
      </div>
    </motion.div>
  )
}
