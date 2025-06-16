import type { BaseHubConfig } from "basehub"

const playgroundId = process.env.VERCEL_URL
  ? encodeURIComponent(process.env.VERCEL_URL)
  : undefined

export const fallbackPlayground: BaseHubConfig["fallbackPlayground"] =
  playgroundId ? { target: "basehub/nextjs-blog", id: playgroundId } : undefined

const basehubConfig: BaseHubConfig = { fallbackPlayground }

export default basehubConfig
