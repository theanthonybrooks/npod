"use client"

import { Navbar } from "@/app/ui/components/navbar"
import { cn, useIsMobile } from "@/utils/utils"
import { useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const { scrollY } = useScroll()
  const [fixedBg, setFixedBg] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const isMobile = useIsMobile()

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (imgRef.current && !isMobile) {
      const threshold = 2
      const rect = imgRef.current.getBoundingClientRect().height
      console.log(latest, rect, fixedBg, window.innerHeight)
      if (latest >= rect - window.innerHeight - threshold) {
        setFixedBg(true)
      } else {
        setFixedBg(false)
      }
    }
  })

  useEffect(() => {
    if (imgRef.current) {
      console.log(
        "Image natural size:",
        imgRef.current.naturalWidth,
        imgRef.current.naturalHeight
      )
    }
  }, [])

  return (
    <>
      <Navbar />

      <div className='font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-16'>
        <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-center text-white/80 h-[800vh]'>
          <header
            className='uppercase text-[9em]
 font-black flex flex-col leading-[8rem] items-start'>
            <p>No Point</p>
            <p>Of</p>
            <p>Departure</p>
          </header>
        </main>
        <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
          <p>
            Made by{" "}
            <Link href='https://theanthonybrooks.com'>Anthony Brooks</Link>
          </p>
          <p>
            Designed by{" "}
            <Link href='https://design.zerenoruc.com'>Zeren Oruc</Link>
          </p>
        </footer>
      </div>
      <img
        ref={imgRef}
        src='/images/backg_large_longer.jpg'
        alt='Background'
        className={cn(
          "-z-1 h-screen sm:h-auto",
          fixedBg ? "fixed bottom-0" : " absolute top-0"
        )}
      />
    </>
  )
}
