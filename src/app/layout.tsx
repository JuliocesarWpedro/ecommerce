import Header from '@/components/Header';
import './globals.css';
import { Saira } from 'next/font/google';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import Footer from '@/components/Footer';
import { ContextProductsProvider } from '@/components/ContextProductsProvider';
import { Metadata } from 'next';
import { Suspense } from 'react';

const saira = Saira({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | E-commerce',
    default: 'E-commerce',
  },
  description: 'E-commerce page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <ContextProductsProvider>
        <html lang="en">
          <body
            className={saira.className}
            style={{ scrollBehavior: 'smooth' }}
          >
            <Header />
            <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
            <Footer />
          </body>
        </html>
      </ContextProductsProvider>
    </ReactQueryClientProvider>
  );
}
