import { IBM_Plex_Sans_Arabic, Noto_Sans_Arabic } from 'next/font/google';
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsAppFloating";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d5c46",
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aljalal.vercel.app'),
  title: {
    default: "الجلال — التدقيق اللغوي المُحْكَم | الدقة في اللغة... والإحكام في الصياغة",
    template: "%s | الجلال للتدقيق اللغوي المُحْكَم"
  },
  description: "الجلال — التدقيق اللغوي المُحْكَم. مُتخصصون في التدقيق والتحرير اللغوي وكتابة المحتوى الإبداعي والتسويقي والمعرفي وفق أعلى معايير الجودة لرسائل الماجستير والدكتوراه والكتب والمحتوى المؤسسي.",
  keywords: [
    "الجلال للتدقيق اللغوي",
    "التدقيق اللغوي المحكم",
    "تدقيق لغوي",
    "تحرير أكاديمي",
    "تصحيح رسائل ماجستير ودكتوراه",
    "تحرير كتب وروايات",
    "التواصل المؤسسي",
    "صناعة محتوى تسويقي",
    "تدقيق لغوي اليمن وصنعاء",
    "تدقيق لغوي السعودية والخليج",
    "مراجعة نقدية للأبحاث"
  ],
  authors: [{ name: "منصة الجلال للتدقيق اللغوي المُحْكَم", url: "https://aljalal.vercel.app" }],
  creator: "الجلال",
  publisher: "الجلال للتدقيق اللغوي المُحْكَم",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://aljalal.vercel.app",
    siteName: "الجلال — التدقيق اللغوي المُحْكَم",
    title: "الجلال — التدقيق اللغوي المُحْكَم | الدقة في اللغة... والإحكام في الصياغة",
    description: "مُتخصصون في التدقيق والتحرير اللغوي وكتابة المحتوى الإبداعي والتسويقي والمعرفي. نمنح النصوص قوة لغوية ووضوحًا فكريًا وتأثيرًا يُحدث الفرق.",
    images: [
      {
        url: "/assets/almuhkam-paper-hero.jpg",
        width: 1200,
        height: 630,
        alt: "الجلال — التدقيق اللغوي المُحْكَم",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الجلال — التدقيق اللغوي المُحْكَم | الدقة في اللغة... والإحكام في الصياغة",
    description: "الدقة في اللغة... والإحكام في الصياغة. خدمات تدقيق نحوي وإملائي ومراجعة أكاديمية متخصصة.",
    images: ["/assets/almuhkam-paper-hero.jpg"],
  },
  alternates: {
    canonical: "https://aljalal.vercel.app",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
    shortcut: "/favicon.svg",
  },
  verification: {
    google: "GcVTmztjN4uL5vShst7rb0s4sbtCDqMnVrYrXC1Re00",
  },
};

export default function RootLayout({ children }) {
  // Schema.org Structured Data (JSON-LD) for Local Business / Professional Service
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "الجلال — التدقيق اللغوي المُحْكَم",
    "alternateName": "Al-Jalal Proofreading Platform",
    "slogan": "الدقة في اللغة... والإحكام في الصياغة",
    "url": "https://aljalal.vercel.app",
    "logo": "https://aljalal.vercel.app/assets/almuhkam-paper-hero.jpg",
    "image": "https://aljalal.vercel.app/assets/almuhkam-paper-hero.jpg",
    "description": "مُتخصصون في التدقيق والتحرير اللغوي وكتابة المحتوى الإبداعي والتسويقي والمعرفي وفق أعلى معايير الجودة للأبحاث والرسائل الجامعية والكتب والشركات.",
    "telephone": "+967770334448",
    "email": "jalal611@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "صنعاء",
      "addressCountry": "YE"
    },
    "priceRange": "$$",
    "areaServed": ["YE", "SA", "AE", "QA", "KW", "OM", "EG", "BH"],
    "availableLanguage": ["Arabic"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "مجالات التدقيق اللغوي وصناعة المحتوى",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التدقيق والتحرير اللغوي والتأليف" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التواصل المؤسسي والكتابة المهنية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الدعاية والإعلان وشبكات التواصل الاجتماعي" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "خدمات لطلبة الجامعات والباحثين" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تحرير الكتب والروايات" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "المراجعة والنقد الأكاديمي" } }
      ]
    }
  };

  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.className} ${notoSansArabic.className}`}>
      <head>
        <meta name="google-site-verification" content="GcVTmztjN4uL5vShst7rb0s4sbtCDqMnVrYrXC1Re00" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: "80vh" }}>
          {children}
        </main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
