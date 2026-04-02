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

import { ThemeProvider } from '@/lib/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProgressBar, BackToTop, PageTransition } from '@/components/ui/PageUtils';
import Cursor from '@/components/ui/Cursor';

export const metadata = {
  title: 'TRP Global — TechRiskPartners | Enterprise Risk Management & IT Consulting',
  description: 'TRP Global (TechRiskPartners) is a specialist IT consulting and risk management company. Oracle, SAP, and AI-powered solutions for 100+ global enterprises across 18 countries.',
  keywords: 'TRP Global, enterprise risk management, Oracle consulting, SAP consulting, IT audit, compliance, digital transformation',
  openGraph: {
    title: 'TRP Global — TechRiskPartners',
    description: 'Enterprise Risk Management & IT Consulting for global enterprises.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;1,8..60,300&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <ProgressBar />
          <PageTransition />
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
