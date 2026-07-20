import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const inquiryMessage = encodeURIComponent(
  "Hello Pillarlift, I would like to learn more about your lifting equipment.",
);

export default function WhatsAppButton() {
  return (
    <a
      className="pl-whatsapp-button"
      href={`${siteConfig.whatsappHref}?text=${inquiryMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Contact Pillarlift on WhatsApp at ${siteConfig.whatsapp}`}
      title="Chat with us on WhatsApp"
    >
      <span className="pl-whatsapp-icon" aria-hidden="true">
        <MessageCircle size={27} strokeWidth={2.2} />
      </span>
      <span className="pl-whatsapp-copy">
        <small>Need help?</small>
        <strong>WhatsApp Us</strong>
      </span>
    </a>
  );
}
