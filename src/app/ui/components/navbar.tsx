import { cn } from "@/utils/utils"
import { GiMultiDirections } from "react-icons/gi"

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  return (
    <div
      className={cn(
        "sticky top-6 z-50 max-w-[95vw] h-10 bg-white rounded-full w-full mx-auto flex justify-between px-20 text-foreground items-center",
        className
      )}>
      <GiMultiDirections className='size-9 text-foreground' />
    </div>
  )
}
