import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import WhatsAppButton from "./WhatsAppButton";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-site">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
