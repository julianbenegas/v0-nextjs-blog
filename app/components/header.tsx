import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-5 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Blog</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
