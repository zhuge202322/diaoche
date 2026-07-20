import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { loadSitePosts } from "@/lib/site-data";

export const metadata = {
  title: "News",
  description: "Pillarlift news, buying notes and export guidance for aerial work platforms, cranes and spare parts.",
};

export default async function NewsPage() {
  const posts = await loadSitePosts(6);

  return (
    <SiteFrame>
      <section className="pl-page-hero">
        <div className="pl-container">
          <span className="pl-eyebrow">News</span>
          <h1>Industry notes for aerial work platforms, cranes and lifting equipment exports.</h1>
          <p>Follow product updates, buying guidance, shipment notes and fleet support ideas from Pillarlift.</p>
        </div>
      </section>

      <section className="pl-section pl-paper">
        <div className="pl-container">
          <div className="pl-news-grid">
            {posts.map((item) => (
              <Reveal key={item.slug}>
                <article className="pl-news-card">
                  {item.image ? <img className="pl-news-image" src={item.image} alt="" loading="lazy" /> : null}
                  <time>{item.date}</time>
                  <h3><Link href={`/news/${item.slug}`}>{item.title}</Link></h3>
                  <p>{item.excerpt}</p>
                  <Link className="pl-text-link" href={`/news/${item.slug}`}>
                    Read article <ArrowRight size={16} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
