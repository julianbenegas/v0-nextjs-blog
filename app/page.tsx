import { basehub } from "basehub"
import { Intro } from "./components/intro"
import { HeroPost, PostMetaFragment } from "./components/hero-post"
import { MoreStories } from "./components/more-stories"
import { Newsletter } from "./components/newsletter"

export const dynamic = "force-static"

export default async function Page() {
  const data = await basehub().query({
    blog: {
      morePosts: true,
      posts: {
        __args: { orderBy: "date__DESC" },
        items: PostMetaFragment,
      },
    },
    newsletter: {
      subscribers: {
        ingestKey: true,
        schema: true,
      },
    },
  })

  const heroPost = data.blog.posts.items[0]
  const morePosts = data.blog.posts.items.slice(1)

  return (
    <main>
      <section className="container mx-auto px-5">
        <Intro />
        {heroPost && <HeroPost {...heroPost} />}
        <MoreStories morePosts={morePosts} title={data.blog.morePosts} />
      </section>
      <Newsletter newsletter={data.newsletter.subscribers} />
    </main>
  )
}
