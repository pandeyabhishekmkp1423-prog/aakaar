import Button from "@/components/common/Button";

export function FaqSection() {
  const faqs = [
    {
      q: "Who owns the source code, databases, and intellectual property?",
      a: "You retain 100% full intellectual property and code ownership upon completion of each sprint. All source repositories, infrastructure templates, API integrations, and database schemas are transferred directly to your organization with zero recurring agency retainers or proprietary locks.",
    },
    {
      q: "What technical stacks and frameworks do you build with?",
      a: "We engineer production applications with Next.js, React, TypeScript, Node.js, Python, PostgreSQL, Redis, and Tailwind CSS, backed by cloud architectures on AWS, GCP, and Azure. For CRM and automation, we leverage official WhatsApp Cloud API and custom microservices.",
    },
    {
      q: "How does cross-timezone collaboration work for global clients?",
      a: "Our senior technical and marketing leads maintain dedicated daily overlap windows across North American (EST/PST) and European (GMT/CET) business hours. Clients receive direct access to their assigned engineers via dedicated Slack or Microsoft Teams channels with daily asynchronous updates.",
    },
    {
      q: "What is your pricing model and project guarantee?",
      a: "We work primarily on transparent, fixed-price milestone contracts. Every sprint has clearly defined acceptance criteria that must pass functional testing before invoice sign-off. We sign mutual non-disclosure agreements (NDAs) prior to any code or data review.",
    },
    {
      q: "Do you offer post-launch support and uptime SLAs?",
      a: "Yes. Every platform is backed by our proactive maintenance and support SLAs, including 24/7 infrastructure monitoring, automated security patch deployments, sub-second error telemetry, and guaranteed emergency response times under 4 hours.",
    },
    {
      q: "How do you unite performance marketing with software engineering?",
      a: "Traditional agencies run marketing campaigns on slow, fragile CMS templates. We engineer sub-second headless web apps and high-converting landing pages integrated directly into your marketing analytics and CRM pipelines, lowering customer acquisition cost (CAC) while scaling ROAS.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-surface border-b border-border relative" id="faq">
      <div className="ad-container">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="ad-kicker">07 / Transparent Clear Answers</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold font-heading text-ink dark:text-white tracking-tight mb-4">
            Frequently Asked <span className="accent">Questions.</span>
          </h2>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Straightforward answers about our intellectual property transfer, technical architectures, pricing transparency, and global delivery standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-surface-2 border border-border hover:border-lime/60 transition-all duration-300 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-surface flex items-center justify-center text-lime shrink-0 text-xs font-mono font-bold border border-border">
                    0{idx + 1}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-ink dark:text-white leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed pl-9">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-muted mb-4">
            Have a custom architectural requirement or compliance question not covered here?
          </p>
          <Button variant="secondary" size="md" href="/contact" arrow="right">
            Ask Our Technical Leads
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
