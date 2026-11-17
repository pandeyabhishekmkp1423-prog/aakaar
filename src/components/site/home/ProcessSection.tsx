export function ProcessSection() {
  return (
    <section className="ad-process" id="how-we-work">
      <div className="ad-container">
        <div className="ad-process-intro">
          <p className="ad-kicker">05 / The 4-Stage Execution Model</p>
          <h2>
            Zero guesswork.
            <br />
            <span>Measurable velocity.</span>
          </h2>
          <p className="ad-body">
            We eliminate technical debt and marketing vanity metrics. Every sprint delivers tangible code, validated pipelines, and measurable commercial return.
          </p>
        </div>
        <div className="ad-steps">
          {[
            [
              "01",
              "Deep Audit & Data Diagnostics",
              "We inspect your current SEO footprint, paid traffic CAC, server latency, codebase structure, and database schema bottlenecks.",
            ],
            [
              "02",
              "Architecture & Growth Blueprint",
              "We design high-fidelity UX mockups, data entity models, campaign structures, and a transparent sprint roadmap.",
            ],
            [
              "03",
              "Agile Build & Campaign Deployment",
              "We write clean, test-driven production code, configure cloud infrastructure, and launch optimized multi-channel campaigns.",
            ],
            [
              "04",
              "Conversion Optimization & Scale",
              "Continuous A/B multivariate testing, automated monitoring, 24/7 security patch SLAs, and aggressive organic expansion.",
            ],
          ].map(([num, title, desc]) => (
            <div className="ad-step" key={num}>
              <b>{num}</b>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
