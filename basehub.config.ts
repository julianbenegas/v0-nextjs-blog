import { setGlobalConfig } from "basehub"

let v0Id = process.env.VERCEL_URL
if (v0Id && v0Id.includes("vusercontent")) {
  v0Id = v0Id.split(".")[0]
}

export const isMainV0 = v0Id === "kzmgszw7trhii5vxkqqa"
const playgroundId = `${v0Id ? encodeURIComponent(v0Id) : "__dev"}__rel_v0`

setGlobalConfig({
  fallbackPlayground: playgroundId
    ? { target: "basehub/nextjs-blog", id: playgroundId }
    : undefined,
})
