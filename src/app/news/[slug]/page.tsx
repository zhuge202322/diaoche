import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MessageSquareText } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import SiteFrame from "@/components/site/SiteFrame";
import { fallbackPosts, loadSitePost, loadSitePosts } from "@/lib/site-data";

export function generateStaticParams() {
  return fallbackPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await loadSitePost(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await loadSitePost(slug);

  if (!post) notFound();

  const relatedPosts = (await loadSitePosts(12)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const sections = post.content?.length
    ? post.content
    : [{ heading: "Article", paragraphs: [post.excerpt] }];

  return (
    <SiteFrame>
      <section className="pl-article-hero">
        {post.image ? <img src={post.image} alt={post.title} /> : null}
        <div className="pl-article-shade" aria-hidden="true" />
        <div className="pl-container pl-article-hero-inner">
          <Link className="pl-article-back" href="/news"><ArrowLeft size={17} /> Back to News</Link>
          <span className="pl-eyebrow">{post.category || "News"}</span>
          <h1>{post.title}</h1>
          <div className="pl-article-meta">
            <span><CalendarDays size={16} /> {post.date}</span>
            <span><Clock3 size={16} /> {post.readTime || "5 min read"}</span>
          </div>
        </div>
      </section>

      <section className="pl-section">
        <div className="pl-container pl-article-layout">
          <article className="pl-article-body">
            <p className="pl-article-lead">{post.excerpt}</p>
            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>

          <aside className="pl-article-aside">
            <span className="pl-eyebrow">Equipment inquiry</span>
            <h3>Need pricing or available equipment?</h3>
            <p>Send your preferred machine type, working height, capacity, quantity and destination country.</p>
            <Link className="pl-btn" href="/contact-us">
              Contact Pillarlift <MessageSquareText size={17} />
            </Link>
          </aside>
        </div>
      </section>

      {relatedPosts.length ? (
        <section className="pl-section pl-paper">
          <div className="pl-container">
            <Reveal>
              <div className="pl-section-head">
                <div>
                  <span className="pl-eyebrow">More insights</span>
                  <h2>Related equipment and market articles.</h2>
                </div>
                <Link className="pl-text-link" href="/news">All News <ArrowRight size={16} /></Link>
              </div>
            </Reveal>
            <div className="pl-news-grid">
              {relatedPosts.map((item) => (
                <article className="pl-news-card" key={item.slug}>
                  {item.image ? <img className="pl-news-image" src={item.image} alt="" loading="lazy" /> : null}
                  <time>{item.date}</time>
                  <h3><Link href={`/news/${item.slug}`}>{item.title}</Link></h3>
                  <p>{item.excerpt}</p>
                  <Link className="pl-text-link" href={`/news/${item.slug}`}>Read article <ArrowRight size={16} /></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </SiteFrame>
  );
}
