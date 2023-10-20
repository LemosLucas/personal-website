import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
  const blogEntries = await getCollection("posts");

  return rss({
    title: "Lucas Lemos Blog",
    description: "Regular dumps of thoughts",
    site: context.site,
    items: blogEntries.map(blog => ({
        title: blog.data.title,
        pubDate: blog.data.date,
        description: blog.data.description,
        link: `/blog/${blog.slug}`,
      }))
  });
}
