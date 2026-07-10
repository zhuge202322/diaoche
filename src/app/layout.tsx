import "./globals.css";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.company}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
