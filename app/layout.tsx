import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import { Pump } from "basehub/react-pump"
import type { Metadata } from "next"
import { basehub } from "basehub"
import Footer from "./components/footer"
import { PlaygroundNotification } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "./components/header"

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
          <Pump
            queries={[
              {
                _sys: {
                  playgroundInfo: {
                    expiresAt: true,
                    editUrl: true,
                    claimUrl: true,
                  },
                },
              },
            ]}
          >
            {async ([{ _sys }]) => {
              "use server"

              if (!_sys.playgroundInfo) return null
              return (
                <PlaygroundNotification playgroundInfo={_sys.playgroundInfo} />
              )
            }}
          </Pump>
          <Header />
          <main className="min-h-screen">
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
