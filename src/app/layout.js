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
  metadataBase: new URL('https://aljalal.com'),
  title: {
    default: "الجلال — منصة التدقيق اللغوي والتحرير الأكاديمي",
    template: "%s | الجلال"
  },
  description: "الجلال هي المنصة العربية الرائدة للتدقيق اللغوي والتحرير الأكاديمي الاحترافي لرسائل الماجستير، أطروحات الدكتوراه، الكتب، والمحتوى المؤسسي بأعلى معايير الدقة والسرية.",
  keywords: [
    "تدقيق لغوي",
    "تحرير أكاديمي",
    "تصحيح رسائل ماجستير",
    "تصحيح رسائل دكتوراه",
    "تدقيق نحوي وإملائي",
    "تحرير كتب وروايات",
    "صياغة بحوث علمية",
    "مراجعة نقدية للأبحاث",
    "تدقيق لغوي اليمن",
    "تدقيق لغوي السعودية والخليج",
    "منصة الجلال"
  ],
  authors: [{ name: "منصة الجلال للتدقيق اللغوي", url: "https://aljalal.com" }],
  creator: "الجلال",
  publisher: "منصة الجلال",
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
    url: "https://aljalal.com",
    siteName: "منصة الجلال للتدقيق والتحرير",
    title: "الجلال — منصة التدقيق اللغوي والتحرير الأكاديمي",
    description: "نرتقي بنصوصكم إلى مستوى الإتقان اللغوي. خدمات تدقيق نحوي وإملائي وتحرير أكاديمي بأيدي نخبة من الخبراء.",
    images: [
      {
        url: "/assets/almuhkam-paper-hero.jpg",
        width: 1200,
        height: 630,
        alt: "منصة الجلال للتدقيق اللغوي والتحرير الأكاديمي",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "الجلال — منصة التدقيق اللغوي والتحرير الأكاديمي",
    description: "خدمات تدقيق لغوي وتحرير أكاديمي احترافية للأبحاث والرسائل الجامعية والكتب.",
    images: ["/assets/almuhkam-paper-hero.jpg"],
  },
  alternates: {
    canonical: "https://aljalal.com",
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
    "name": "منصة الجلال للتدقيق اللغوي والتحرير الأكاديمي",
    "alternateName": "Al-Jalal Proofreading Platform",
    "url": "https://aljalal.com",
    "logo": "https://aljalal.com/assets/almuhkam-paper-hero.jpg",
    "image": "https://aljalal.com/assets/almuhkam-paper-hero.jpg",
    "description": "منصة احترافية متخصصة في التدقيق اللغوي، المراجعة الأكاديمية لرسائل الماجستير والدكتوراه، وتحرير الكتب والمحتوى المؤسسي.",
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
      "name": "خدمات التدقيق اللغوي",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تدقيق الأبحاث والرسائل الجامعية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "تحرير الكتب والمقالات" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "الكتابة المؤسسية والتقارير" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "المراجعة والنقد الأكاديمي" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "التفريغ الصوتي" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "خدمات الطلاب" } }
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
