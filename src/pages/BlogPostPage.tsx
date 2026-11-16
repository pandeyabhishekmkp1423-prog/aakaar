import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Link from "@/components/common/Link";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { getArticleSchema, getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { TableOfContents } from "@/components/site/TableOfContents";
import { ShareButtons } from "@/components/site/ShareButtons";
import { Clock, Calendar, User, ArrowLeft, ArrowRight, Tag, Loader2 } from "lucide-react";
import NotFoundPage from "./NotFoundPage";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let isCancelled = false;
    setLoading(true);
    setNotFound(false);

    fetchApi(`/v1/posts/${slug}`)
      .then((res) => {
        if (isCancelled) return;

        if (res.redirect && res.target_slug) {
          navigate(`/blog/${res.target_slug}`, { replace: true });
          return;
        }

        if (res.data) {
          setPost(res.data);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug, navigate]);

  useSEO({
    title: post ? (post.meta_title || `${post.title} | Aakaar Digital`) : "Blog | Aakaar Digital",
    description: post?.meta_description || post?.excerpt,
    canonical: slug ? `/blog/${slug}` : undefined,
  });

  if (loading) {
    return (
      <div className="flex justify-center py-32 bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-[#151A0C] dark:text-[#B9F000]" />
      </div>
    );
  }

  if (notFound || !post) {
    return <NotFoundPage />;
  }

  const siteUrl = (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) || "https://aakaardigital.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ];

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <JsonLd
        data={getArticleSchema({
          title: post.title,
          description: post.excerpt,
          slug: post.slug,
          publishedTime: post.published_at,
          modifiedTime: post.updated_at,
          authorName: post.author_name,
          coverImage: post.cover_image,
        })}
      />
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <article className="pt-10 pb-16 sm:pt-16 sm:pb-24 bg-surface">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs & Back */}
          <div className="flex items-center justify-between gap-4 mb-6 text-xs text-secondary">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-[#151A0C] dark:text-[#B9F000] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all insights</span>
            </Link>

            {post.categories?.[0] && (
              <span className="flex items-center gap-1 bg-[#E8EDE4] dark:bg-[#151A0C] text-[#151A0C] dark:text-[#B9F000] px-2.5 py-1 rounded-md font-semibold">
                <Tag className="w-3 h-3" />
                {post.categories[0].name}
              </span>
            )}
          </div>

          {/* Title & Metadata */}
          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink font-heading tracking-tight leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-secondary pb-6 border-b border-line">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                <span>By {post.author_name || "Aakaar Digital Editorial"}</span>
              </span>
              {formattedDate && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                  <span>{formattedDate}</span>
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4B6300] dark:text-[#B9F000]" />
                <span>{post.reading_time || 5} min read</span>
              </span>
            </div>
          </div>

          {/* Cover Image Banner */}
          {post.cover_image && (
            <div className="relative aspect-[21/9] sm:aspect-[2.2/1] rounded-2xl overflow-hidden mb-10 border border-line shadow-sm bg-canvas">
              <img
                src={getMediaUrl(post.cover_image)}
                alt={post.cover_alt || post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>
          )}

          {/* Layout: Content & Sticky TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Article Body */}
            <div className="lg:col-span-8">
              {/* Mobile Expandable Table of Contents */}
              <div className="lg:hidden">
                <TableOfContents contentHtml={post.content} isMobile />
              </div>

              {post.excerpt && (
                <div className="p-5 sm:p-6 rounded-xl bg-[#E8EDE4] dark:bg-[#151A0C] border border-[#AEDD00]/40 dark:border-[#22291C] text-base sm:text-lg text-ink font-medium leading-relaxed mb-8">
                  {post.excerpt}
                </div>
              )}

              {/* Sanitized HTML Content */}
              <div
                className="prose-measure space-y-6 text-base sm:text-lg text-secondary leading-relaxed blog-content-wrapper "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom Share & Category Tags */}
              <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  {post.categories?.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/blog?category=${cat.slug}`}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-line bg-canvas text-secondary hover:text-ink hover:border-[#AEDD00] dark:hover:border-[#B9F000] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </div>

            {/* Right: Table of Contents */}
            <div className="lg:col-span-4 hidden lg:block">
              <TableOfContents contentHtml={post.content} />
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {post.related_posts?.length > 0 && (
        <section className="py-16 sm:py-24 border-t border-line bg-canvas">
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold font-heading text-ink mb-8">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {post.related_posts.map((rel: any, idx: number) => (
                <article
                  key={rel.id}
                  className="bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#AEDD00] dark:hover:border-[#B9F000] hover:shadow-[0_12px_32px_rgba(185,240,0,0.10)] group"
                >
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#8B9685] dark:text-[#A2A69B] group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-3 sm:mb-4 block select-none">
                      {`0${idx + 1}`}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-ink group-hover:text-[#151A0C] dark:group-hover:text-[#B9F000] transition-colors mb-2 leading-snug">
                      <Link href={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary line-clamp-3 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#151A0C] dark:text-[#B9F000] hover:underline group"
                  >
                    <span>Read perspective</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing Enquiry CTA */}
      <section className="py-16 sm:py-20 bg-surface border-t border-line">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-xl p-8 sm:p-12 bg-white dark:bg-[#151711] border border-[#DCE3D6] dark:border-[#22291C] shadow-xs max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold text-[#151A0C] dark:text-[#B9F000] tracking-wider uppercase mb-3 block select-none">
              08 / Architectural Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-ink mb-3">
              Need Assistance Implementing These Strategies?
            </h2>
            <p className="text-secondary text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
              Our software engineering and IT specialists are ready to help you analyze, plan, and execute with full IP ownership.
            </p>
            <Link href="/contact" className="btn-primary min-h-[46px] px-8 text-sm font-semibold group">
              <span>Book a free consultation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


