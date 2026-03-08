import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FastPath Benefits Screener — Free Benefits Pre-Screen",
  description:
    "Free, plain-language pre-screen for SNAP, Medicaid, WIC, and LIHEAP. No signup required.",
  keywords: ["benefits calculator", "SNAP eligibility", "food stamps", "WIC", "Medicaid", "government benefits"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0A0A0A] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
