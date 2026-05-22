import './globals.css';
import '@/styles/HomePage.css';
import '@/styles/ServicesPage.css';
import '@/styles/OracleRMCPage.css';
import '@/styles/AboutPage.css';
import '@/styles/InsightsPage.css';
import '@/styles/CareersPage.css';
import '@/styles/ContactPage.css';
import '@/styles/LoginPage.css';
import '@/styles/AdminDashboard.css';
import '@/styles/OurTeamPage.css';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProgressBar, BackToTop, PageTransition } from '@/components/ui/PageUtils';
import WebinarPopup from '@/components/ui/WebinarPopup';

export const metadata = {
  title: 'Boost Your Enterprise Security & IT Efficiency | TRPGLOBAL',
  description: 'Enhance your business resilience with expert Enterprise Risk Management & IT Consulting. Secure your future with TRPGLOBAL today.',
  keywords: 'TRPGLOBAL, enterprise risk management, Oracle consulting, IT audit, compliance, digital transformation',
  alternates: {
    canonical: 'https://www.techriskpartners.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/assets/TRPGLOBAL_NEWUPDATE%202%205.png',
    shortcut: '/assets/TRPGLOBAL_NEWUPDATE%202%205.png',
    apple: '/assets/TRPGLOBAL_NEWUPDATE%202%205.png',
  },
  verification: {
    google: 'mMFbUh8oyRe150hPElr4CkYA6s0ZoGxNw3K2KeWjVfs',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.techriskpartners.com/',
    title: 'TRPGLOBAL | Expert Risk Management Solutions & Strategies',
    description: 'AI-driven cybersecurity, Oracle risk management, compliance automation and enterprise risk solutions.',
    images: [
      {
        url: 'https://www.techriskpartners.com/assets/TRPGLOBAL_NEWUPDATE%202%205.png',
      },
    ],
    siteName: 'TRPGLOBAL',
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://www.techriskpartners.com/',
    title: 'TRPGLOBAL | Expert Risk Management Solutions & Strategies',
    description: 'AI-driven cybersecurity, Oracle risk management, compliance automation and enterprise risk solutions.',
    images: ['https://www.techriskpartners.com/assets/TRPGLOBAL_NEWUPDATE%202%205.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TRPGLOBAL",
              "url": "https://www.techriskpartners.com/",
              "logo": "https://www.techriskpartners.com/assets/TRPGLOBAL_NEWUPDATE%202%205.png",
              "description": "AI-driven cybersecurity and enterprise risk management solutions.",
              "sameAs": [
                "https://www.linkedin.com/company/technology-risk-ltd",
                "https://www.instagram.com/trp.global_/"
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ProgressBar />
          <PageTransition />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WebinarPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
