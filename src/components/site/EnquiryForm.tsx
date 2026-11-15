import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "@/components/common/Link";
import { fetchApi } from "@/lib/api-client";
import { AlertCircle, Loader2 } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid corporate email address."),
  phone: z.string().optional(),
  company: z.string().min(2, "Please enter your company or organization name."),
  service: z.string().min(1, "Please select the service you are interested in."),
  budget: z.string().min(1, "Please select an estimated budget range."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the Privacy Policy to proceed." }),
  }),
  website_hp: z.string().optional(), // Honeypot field
  _form_ts: z.number(), // Timestamp for fill-time check
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryFormProps {
  defaultService?: string;
}

export function EnquiryForm({ defaultService }: EnquiryFormProps) {
  const navigate = useNavigate();
  const [formTs, setFormTs] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setFormTs(Math.floor(Date.now() / 1000));
  }, []);

  const softwareServices = [
    "Web Development",
    "Mobile App Development",
    "Custom Software Development",
    "CRM Solutions",
    "LMS & E-Learning Platforms",
    "WhatsApp Automation",
    "Integrations & Workflow Automation",
    "Maintenance & Support",
  ];

  const budgetRanges = [
    "$15,000 - $30,000 USD (MVP / Targeted Automation)",
    "$30,000 - $60,000 USD (Custom Web or Mobile Application)",
    "$60,000 - $120,000 USD (Enterprise Multi-System Platform)",
    "$120,000+ USD (Large-Scale Architecture & Deployment)",
    "Exploring Feasibility / Quote Required",
  ];

  const normalizeService = (svc?: string) => {
    if (!svc) return "Web Development";
    if (svc.includes("Web")) return "Web Development";
    if (svc.includes("Mobile")) return "Mobile App Development";
    if (svc.includes("Custom") || svc.includes("Software")) return "Custom Software Development";
    if (svc.includes("CRM")) return "CRM Solutions";
    if (svc.includes("LMS") || svc.includes("Learning")) return "LMS & E-Learning Platforms";
    if (svc.includes("WhatsApp")) return "WhatsApp Automation";
    if (svc.includes("Integration") || svc.includes("Workflow")) return "Integrations & Workflow Automation";
    if (svc.includes("Maintenance") || svc.includes("Support")) return "Maintenance & Support";
    return softwareServices.includes(svc) ? svc : "Web Development";
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      service: normalizeService(defaultService),
      budget: budgetRanges[0],
      consent: false as any,
      website_hp: "",
      _form_ts: formTs || Math.floor(Date.now() / 1000),
    },
  });

  useEffect(() => {
    if (defaultService) {
      setValue("service", normalizeService(defaultService));
    }
  }, [defaultService, setValue]);

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const enrichedMessage = `[Company: ${data.company}] [Estimated Budget: ${data.budget}]\n\n${data.message}`;

    const payload = {
      ...data,
      message: enrichedMessage,
      _form_ts: formTs || Math.floor(Date.now() / 1000),
    };

    try {
      const res = await fetchApi("/v1/enquiries", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("maple_enquiry_success", "true");
        sessionStorage.setItem("maple_enquiry_service", data.service);
        sessionStorage.setItem("maple_enquiry_company", data.company);
        sessionStorage.setItem("maple_enquiry_budget", data.budget);
      }

      setIsSubmitting(false);

      if (res.success || res.error?.code === "NETWORK_ERROR") {
        navigate("/thank-you");
      } else {
        setSubmitError(
          res.error?.message ||
            "We were unable to submit your inquiry at this time. Please try again or contact us directly at info@aakaardigital.com."
        );
      }
    } catch {
      setIsSubmitting(false);
      navigate("/thank-you");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-[#12231F] border border-black/[0.08] dark:border-[#1C332D] rounded-2xl p-6 sm:p-8 md:p-9 shadow-xs space-y-5 sm:space-y-6"
      noValidate
      id="public-enquiry-form"
    >
      {submitError && (
        <div
          className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">{submitError}</div>
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_hp">Do not fill this field if human</label>
        <input
          type="text"
          id="website_hp"
          tabIndex={-1}
          autoComplete="off"
          {...register("website_hp")}
        />
      </div>

      <input type="hidden" {...register("_form_ts")} value={formTs} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Full Name <span className="text-maple">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Evelyn Moreau"
            autoComplete="name"
            {...register("name")}
            className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink placeholder:text-[#71818A] dark:placeholder:text-[#A0B5AE] text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px] ${
              errors.name ? "border-red-500 ring-1 ring-red-500" : "border-line"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Corporate Email <span className="text-maple">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="evelyn.moreau@vanguardtransit.com"
            autoComplete="email"
            {...register("email")}
            className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px] ${
              errors.email ? "border-red-500 ring-1 ring-red-500" : "border-line"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label
            htmlFor="company"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Company / Organization <span className="text-maple">*</span>
          </label>
          <input
            id="company"
            type="text"
            placeholder="Vanguard Transit Solutions Inc."
            autoComplete="organization"
            {...register("company")}
            className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px] ${
              errors.company ? "border-red-500 ring-1 ring-red-500" : "border-line"
            }`}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Phone Number <span className="text-secondary text-xs font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (416) 555-0199"
            autoComplete="tel"
            {...register("phone")}
            className="w-full px-4 py-2.5 rounded-[8px] border border-line bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label
            htmlFor="service"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Primary Software Solution Required <span className="text-maple">*</span>
          </label>
          <select
            id="service"
            {...register("service")}
            className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px] ${
              errors.service ? "border-red-500 ring-1 ring-red-500" : "border-line"
            }`}
            aria-invalid={errors.service ? "true" : "false"}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            {softwareServices.map((svc) => (
              <option key={svc} value={svc}>
                {svc}
              </option>
            ))}
          </select>
          {errors.service && (
            <p id="service-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.service.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
          >
            Estimated Budget (USD) <span className="text-maple">*</span>
          </label>
          <select
            id="budget"
            {...register("budget")}
            className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce min-h-[44px] ${
              errors.budget ? "border-red-500 ring-1 ring-red-500" : "border-line"
            }`}
            aria-invalid={errors.budget ? "true" : "false"}
            aria-describedby={errors.budget ? "budget-error" : undefined}
          >
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p id="budget-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs sm:text-sm font-semibold text-ink mb-1.5"
        >
          Project Details & Requirements <span className="text-maple">*</span>
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Briefly describe your application goals, target integrations, or operational bottlenecks..."
          {...register("message")}
          className={`w-full px-4 py-2.5 rounded-[8px] border bg-canvas text-ink text-base sm:text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-spruce ${
            errors.message ? "border-red-500 ring-1 ring-red-500" : "border-line"
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <div className="flex items-center justify-between mt-1.5">
          {errors.message ? (
            <p id="message-error" className="text-xs text-red-600 dark:text-red-400">
              {errors.message.message}
            </p>
          ) : (
            <span className="text-xs text-secondary">
              Minimum 10 characters. Plain language, no technical jargon required.
            </span>
          )}
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 w-4 h-4 rounded text-primary-spruce border-line focus:ring-primary-spruce shrink-0"
            aria-invalid={errors.consent ? "true" : "false"}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span className="text-xs sm:text-sm text-secondary leading-relaxed">
            I consent to Aakaar Digital collecting my details to respond to this commercial enquiry in accordance with the{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-primary-spruce underline hover:text-ink font-medium"
            >
              Privacy Policy
            </Link>{" "}
            and international data privacy guidelines.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 rounded-[10px] bg-[#0F5C4D] hover:bg-[#0A4136] text-white dark:bg-[#3FB89C] dark:hover:bg-[#329B82] dark:text-[#0C1815] text-[14px] sm:text-[15px] font-semibold transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 border border-[#0A4136]/20"
          id="enquiry-submit-btn"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <span>Request a Project Quote</span>
          )}
        </button>
        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-2.5">
          Your details are protected under NDA. We respond within 24 business hours.
        </p>
      </div>
    </form>
  );
}

