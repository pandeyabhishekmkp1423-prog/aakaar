import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Link from "@/components/common/Link";
import { getBreadcrumbSchema, useSEO } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { fetchApi, getMediaUrl } from "@/lib/api-client";
import { Search, Clock, ArrowRight, ArrowLeft, Tag, Loader2 } from "lucide-react";

export default function BlogIndexPage() {
  useSEO({
    title: "Blog & Technical Insights | Aakaar Digital",
    description:
      "Expert articles on software architecture, modern web development standards, conversion optimization, and cybersecurity checklists for growing businesses worldwide.",
    canonical: "/blog",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const rawPage = searchParams.get("page") || "1";
  const category = searchParams.get("category") || "";
  const q = searchParams.get("q") || "";
  const page = Math.max(1, parseInt(rawPage, 10));

  const [searchInput, setSearchInput] = useState(q);
  const [posts, setPosts] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({ total: 0, total_pages: 1 });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const queryParams = new URLSearchParams();
    queryParams.set("page", page.toString());
    queryParams.set("per_page", "9");
    if (category) queryParams.set("category", category);
    if (q) queryParams.set("q", q);

    Promise.all([
      fetchApi(`/v1/posts?${queryParams.toString()}`),
      fetchApi("/v1/categories"),
    ])
      .then(([postsRes, catsRes]) => {
        if (!isCancelled) {
          setPosts(postsRes?.data || []);
          setMeta(postsRes?.meta || { total: 0, total_pages: 1 });
          setCategories(catsRes?.data || []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [page, category, q]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set("q", searchInput.trim());
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />

      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-20 border-b border-line bg-canvas">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-primary-spruce uppercase tracking-wider block mb-2">
              Digital Engineering & Strategy
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink font-heading tracking-tight mb-6">
              Practical Digital Strategy & IT Knowledge.
            </h1>
            <p className="text-lg text-secondary leading-relaxed prose-measure">
              Actionable guides on software engineering standards, modern web development, API integrations, and cybersecurity compliance for business leaders worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 bg-surface min-h-[500px]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-line">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <Link
                href="/blog"
                className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                  !category
                    ? "bg-primary-spruce text-white border-primary-spruce"
                    : "bg-surface text-secondary border-line hover:border-primary-spruce hover:text-ink"
                }`}
              >
                All Articles
              </Link>
              {categories.map((c: any) => (
                <Link
                  key={c.id}
                  href={`/blog?category=${c.slug}`}
                  className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    category === c.slug
                      ? "bg-primary-spruce text-white border-primary-spruce"
                      : "bg-surface text-secondary border-line hover:border-primary-spruce hover:text-ink"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-auto md:min-w-[280px]">
              <input
                type="text"
                name="q"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-2.5 text-base sm:text-sm rounded-lg border border-line bg-canvas text-ink focus:ring-2 focus:ring-primary-spruce focus:outline-none min-h-[44px]"
              />
              <Search className="w-4 h-4 text-secondary absolute left-3 top-3" />
            </form>
          </div>

          {/* Loading Indicator */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-spruce" />
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-12">
              {posts.map((post: any, idx: number) => (
                <article
                  key={post.id}
                  className="bg-white dark:bg-[#11201C] border border-[#DCE4E1] dark:border-[#1C332D] rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#0F5C4D] dark:hover:border-[#3FB89C] hover:shadow-[0_12px_32px_rgba(15,92,77,0.08)] hover:-translate-y-0.5 group"
                >
                  <div>
                    {post.cover_image && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border border-line bg-canvas">
                        <img
                          src={getMediaUrl(post.cover_image)}
                          alt={post.cover_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <span className="font-mono text-xs font-semibold text-[#8B9DA3] dark:text-[#5E7A72] group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors mb-2 block select-none">
                      {`0${idx + 1}`}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold font-heading text-[#14232B] dark:text-white mb-2.5 group-hover:text-[#0F5C4D] dark:group-hover:text-[#3FB89C] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#41545C] dark:text-[#A0B5AE] line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#0F5C4D] dark:text-[#3FB89C] hover:underline"
                  >
                    <span>Read perspective</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 panel-card p-8 bg-canvas">
              <h3 className="text-xl font-bold font-heading text-ink mb-2">
                No Articles Found
              </h3>
              <p className="text-sm text-secondary max-w-md mx-auto mb-6">
                We could not find any published articles matching your criteria. Try adjusting your search query or view all articles.
              </p>
              <Link href="/blog" className="btn-secondary">
                View All Articles
              </Link>
            </div>
          )}

          {/* Pagination */}
          {!loading && (meta.total_pages || 1) > 1 && (
            <nav className="flex items-center justify-between pt-8 border-t border-line" aria-label="Pagination">
              <div>
                {page > 1 ? (
                  <Link
                    href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}${q ? `&q=${q}` : ""}`}
                    className="btn-secondary text-xs flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Page</span>
                  </Link>
                ) : (
                  <span className="btn-secondary text-xs opacity-50 cursor-not-allowed">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Page</span>
                  </span>
                )}
              </div>

              <div className="text-xs font-semibold text-secondary">
                Page {page} of {meta.total_pages}
              </div>

              <div>
                {page < (meta.total_pages || 1) ? (
                  <Link
                    href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}${q ? `&q=${q}` : ""}`}
                    className="btn-secondary text-xs flex items-center gap-1"
                  >
                    <span>Next Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="btn-secondary text-xs opacity-50 cursor-not-allowed">
                    <span>Next Page</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

