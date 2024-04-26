import Header from '@/components/Header';
import './globals.css';
import { Saira } from 'next/font/google';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import SkeletonProducts from '@/components/SkeletonProducts';

const saira = Saira({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'E-commerce',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={saira.className} style={{ scrollBehavior: 'smooth' }}>
          <Header />
          <Suspense fallback={<SkeletonProducts />}>{children}</Suspense>
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
