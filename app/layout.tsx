import { Toolbar } from "basehub/next-toolbar"
import type { Metadata } from "next"
import Footer from "./components/footer"
import "./globals.css"
import "../basehub.config"

export const metadata: Metadata = {
  title: `BaseHub x v0 Example`,
  description: `This is a blog built with BaseHub and v0.`,
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Toolbar />
        <main className="min-h-screen">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
