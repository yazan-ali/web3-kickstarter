"use client"

import type * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu } from "lucide-react"
import cn from "classnames"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border/100 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-6">
      <div className="container flex h-14 items-center px-4 sm:px-0 mx-auto">
        <div className="hidden md:flex">
          <Link href="/" className="mr-6">
            <span className="hidden font-bold sm:inline-block">Kickstarter</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/campaigns" className="transition-colors hover:text-foreground/80 text-foreground/60 capitalize">
              campaigns
            </Link>
            <Link href="/campaigns/new" className="transition-colors hover:text-foreground/80 text-foreground/60 capitalize">
              create campaigns
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink href="/" className="flex items-center" onOpenChange={() => { }}>
              <span className="font-bold">Kickstarter</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <MobileLink href="/campaigns" onOpenChange={() => { }}>
                  campaigns
                </MobileLink>
                <MobileLink href="/campaigns/new" onOpenChange={() => { }}>
                  create campaigns
                </MobileLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 justify-end items-center">
          <div className="">
            <Button
              variant="secondary"
              size="icon"
              aria-label="Toggle Theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

interface MobileLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={cn("text-foreground/70 transition-colors hover:text-foreground capitalize", className)}
      {...props}
    >
      <SheetClose className="capitalize">
        {children}
      </SheetClose>
    </Link>
  )
}

