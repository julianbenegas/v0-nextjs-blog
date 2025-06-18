import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import { basehub } from "basehub"
import Footer from "./components/footer"
import { PlaygroundSetupModal } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"
import { ThemeProvider } from "@/components/theme-provider"
import { isMainV0 } from "../basehub.config"

export const dynamic = "force-static"

export const metadata = {
  generator: "v0.dev",
}

const envs = {
  BASEHUB_TOKEN: false,
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let playgroundNotification = null

  // check if all envs are valid
  let allValid = true
  Object.entries(envs).forEach(([key, value]) => {
    if (!process.env[key]) {
      allValid = false
      return
    }
    envs[key as keyof typeof envs] = true
  })

  if (!isMainV0 && !allValid && process.env.NODE_ENV !== "production") {
    const playgroundData = await basehub().query({
      _sys: {
        playgroundInfo: {
          expiresAt: true,
          editUrl: true,
          claimUrl: true,
        },
      },
    })

    if (playgroundData._sys.playgroundInfo) {
      playgroundNotification = (
        <PlaygroundSetupModal
          playgroundInfo={playgroundData._sys.playgroundInfo}
          envs={envs}
        />
      )
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toolbar />
          {playgroundNotification}
          <main className="min-h-screen">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
