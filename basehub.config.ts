import { setGlobalConfig } from "basehub"

const playgroundId = process.env.VERCEL_URL
  ? encodeURIComponent(process.env.VERCEL_URL)
  : "__dev"

setGlobalConfig({
  fallbackPlayground: playgroundId
    ? { target: "basehub/nextjs-blog", id: playgroundId }
    : undefined,
})
