import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { siteConfig } from "@/data/siteConfig";

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.company}`
  },
  description: siteConfig.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
