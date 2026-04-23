import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { siteContent } from "@/data/site-content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kedarmane.me"),
  title: "Kedar Mane | Data Science & Machine Learning",
  description: "Portfolio of Kedar Mane featuring Data Science, Machine Learning, NLP, and computer vision projects.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/400x400.jpg", sizes: "400x400", type: "image/jpeg" },
    ],
    shortcut: "/favicon.svg",
    apple: [{ url: "/images/400x400.jpg", sizes: "180x180", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Kedar Mane | Data Science & Machine Learning",
    description: "Portfolio of Kedar Mane featuring Data Science, Machine Learning, NLP, and computer vision projects.",
    type: "website",
    images: [
      {
        url: "/images/og-kedar.svg",
        width: 1200,
        height: 630,
        alt: "Kedar Mane Data Science and Machine Learning portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kedar Mane | Data Science & Machine Learning",
    description: "Portfolio of Kedar Mane featuring Data Science, Machine Learning, NLP, and computer vision projects.",
    images: ["/images/og-kedar.svg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteContent.identity.name,
  url: "https://kedarmane.me",
  image: "https://kedarmane.me/images/400x400.jpg",
  jobTitle: siteContent.identity.role,
  description: siteContent.identity.summary,
  email: `mailto:${siteContent.contact.email}`,
  sameAs: siteContent.contact.socialLinks.map((link) => link.href),
  knowsAbout: siteContent.trustHighlights,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem("portfolio-theme");
                if (!theme) theme = "dark";
                document.documentElement.classList.toggle("dark", theme === "dark");
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster position="bottom-right" theme="system" richColors />
      </body>
    </html>
  );
}
