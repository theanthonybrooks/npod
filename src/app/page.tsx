"use client"

import { Navbar } from "@/app/ui/components/navbar"
import { cn } from "@/utils/utils"
import { useMotionValueEvent, useScroll } from "motion/react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [fixedBg, setFixedBg] = useState(false)
  const [imgHeight, setImgHeight] = useState<number | null>(null)

  const imgRef = useRef<HTMLImageElement>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("scrollY: ", latest)
    // Get image size when scrolling

    if (imgRef.current) {
      const threshold = 2
      const rect = imgRef.current.getBoundingClientRect()
      console.log(rect.height)
      console.log(window.innerHeight)
      console.log("Rendered height:", imgRef.current.height)
      // console.log("Natural height:", imgRef.current.naturalHeight)
      if (latest >= rect.height - window.innerHeight - threshold) {
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
      setImgHeight(imgRef.current.getBoundingClientRect().height)
    }
  }, [])

  console.log(fixedBg)

  return (
    <>
      <Navbar />

      <img
        ref={imgRef}
        src='/images/backg_large_longer.jpg'
        alt='Background'
        className={cn("z-0 ", fixedBg ? "fixed bottom-0" : " absolute top-0")}
      />

      <div className='font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 pb-20 gap-16'>
        <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-[4rem] font-black text-center text-white h-[800vh]'>
          meow meow meow
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
    </>
  )
}
