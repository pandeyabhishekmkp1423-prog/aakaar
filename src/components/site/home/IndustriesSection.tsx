import { ArrowUpRight } from "lucide-react";

export function IndustriesSection() {
  return (
    <section className="ad-industries" id="industries">
      <div className="ad-container ad-industry-grid">
        <div>
          <p className="ad-kicker">06 / Domain Expertise</p>
          <h2>
            Tailored architectures.
            <br />
            <span>Rigorous compliance.</span>
          </h2>
          <p className="text-secondary text-sm leading-relaxed mt-4 max-w-md">
            Every sector operates under specific statutory rules, user expectations, and conversion dynamics. We build solutions customized to your vertical.
          </p>
        </div>
        <div className="ad-industry-list">
          {[
            "B2B SaaS & Enterprise Technology",
            "FinTech, Banking & Payment Gateways",
            "Healthcare, HealthTech & HIPAA / PIPEDA",
            "E-Commerce, Omnichannel & Marketplaces",
            "Education, EdTech & Course Platforms",
            "Legal, Accounting & Corporate Services",
            "Supply Chain, Logistics & Fleet Operations",
          ].map((item, i) => (
            <div key={item}>
              <span>0{i + 1}</span>
              {item}
              <ArrowUpRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
