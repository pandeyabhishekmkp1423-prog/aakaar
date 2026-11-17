export function TrustMetricsBar() {
  return (
    <section className="py-8 bg-surface border-y border-border">
      <div className="ad-container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center text-center">
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">4.9x</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">Average Blended ROAS</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">99.99%</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">Cloud Infrastructure SLA</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">14+</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">Countries Served</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">&lt;4 Hours</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">Average Response Time</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">12M+</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">API &amp; Chatbot Touchpoints</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2">
            <span className="font-heading font-extrabold text-2xl text-ink dark:text-white">100%</span>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mt-1">IP Ownership to Client</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustMetricsBar;
