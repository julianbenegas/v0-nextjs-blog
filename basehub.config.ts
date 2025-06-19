import { setGlobalConfig } from "basehub"


const _vercel_url_env_name = 'VERCEL_BRANCH_URL'

let v0Id = process.env[_vercel_url_env_name]
if (v0Id && v0Id.includes("vusercontent")) {
  v0Id = v0Id.split(".")[0]
}

const playgroundId = `${v0Id ? encodeURIComponent(v0Id) : "__dev"}__rel_v0`

setGlobalConfig({
  fallbackPlayground: playgroundId
    ? { target: "basehub/nextjs-blog", id: playgroundId }
    : undefined,
})
