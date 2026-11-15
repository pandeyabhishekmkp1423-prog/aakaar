import { useEffect } from "react";

export default function ThankYouTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if the event was already fired in this session
    const hasFired = sessionStorage.getItem("maple_conversion_fired");
    if (!hasFired) {
      const eventName = (typeof import.meta !== "undefined" && import.meta.env?.VITE_CONVERSION_EVENT) || "generate_lead";
      const serviceName = sessionStorage.getItem("maple_enquiry_service") || "General Enquiry";

      // Dispatch to Google Analytics (gtag) if present
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", eventName, {
          event_category: "Engagement",
          event_label: serviceName,
          value: 1,
        });
      }

      // Dispatch standard browser custom event
      window.dispatchEvent(
        new CustomEvent("maple_conversion", {
          detail: { event: eventName, service: serviceName },
        })
      );

      sessionStorage.setItem("maple_conversion_fired", "true");
    }
  }, []);

  return null;
}
