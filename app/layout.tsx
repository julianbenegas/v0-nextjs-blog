import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import { basehub } from "basehub"
import Footer from "./components/footer"
import { PlaygroundNotification } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"
import { ThemeProvider } from "@/components/theme-provider"
import { isMainV0 } from "../basehub.config"

export const dynamic = "force-static"

export const metadata = {
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let playgroundNotification = null

  if (!isMainV0) {
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
        <PlaygroundNotification
          playgroundInfo={playgroundData._sys.playgroundInfo}
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
