import type React from "react"
import { Toolbar } from "basehub/next-toolbar"
import { Pump } from "basehub/react-pump"
import type { Metadata } from "next"
import Footer from "./components/footer"
import { PlaygroundNotification } from "./components/playground-notification"
import "./globals.css"
import "../basehub.config"

export const metadata: Metadata = {
  title: `BaseHub x v0 Example`,
  description: `This is a blog built with BaseHub and v0.`,
  generator: "v0.dev",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
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
            console.log(JSON.stringify(_sys))

            return (
              <>
                {_sys.playgroundInfo && <PlaygroundNotification playgroundInfo={_sys.playgroundInfo} />}
                <main className="min-h-screen">
                  {children}
                  <Footer />
                </main>
              </>
            )
          }}
        </Pump>
      </body>
    </html>
  )
}
