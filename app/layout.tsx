import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import type { Metadata } from "next"
import { basehub } from "basehub"
import Footer from "./components/footer"
import { PlaygroundNotification } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"
import { ThemeProvider } from "@/components/theme-provider"
import { isMainV0 } from "../basehub.config"

export const dynamic = "force-static"

export async function generateMetadata(): Promise<Metadata> {
  const data = await basehub().query({
    meta: {
      title: true,
      description: true,
      ogImage: {
        url: true,
      },
    },
  })

  return {
    title: data.meta?.title || `BaseHub x v0 Example`,
    description:
      data.meta?.description || `This is a blog built with BaseHub and v0.`,
    generator: "v0.dev",
    openGraph: {
      title: data.meta?.title || `BaseHub x v0 Example`,
      description:
        data.meta?.description || `This is a blog built with BaseHub and v0.`,
      images: data.meta?.ogImage?.url
        ? [
            {
              url: data.meta.ogImage.url,
              width: 1200,
              height: 630,
              alt: data.meta?.title || `BaseHub x v0 Example`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta?.title || `BaseHub x v0 Example`,
      description:
        data.meta?.description || `This is a blog built with BaseHub and v0.`,
      images: data.meta?.ogImage?.url ? [data.meta.ogImage.url] : [],
    },
  }
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

// export const metadata = {
//       generator: 'v0.dev'
//     };
