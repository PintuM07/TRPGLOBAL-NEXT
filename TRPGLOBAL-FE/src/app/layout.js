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
  openGraph: {
    title: 'Boost Your Enterprise Security & IT Efficiency | TRPGLOBAL',
    description: 'Enhance your business resilience with expert Enterprise Risk Management & IT Consulting. Secure your future with TRPGLOBAL today.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.techriskpartners.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="google-site-verification" content="mMFbUh8oyRe150hPElr4CkYA6s0ZoGxNw3K2KeWjVfs" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300&display=swap" rel="stylesheet" />
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
