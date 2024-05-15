import './globals.css';
import { Saira } from 'next/font/google';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { Metadata } from 'next';
import { QueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

const queryClient = new QueryClient();

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
          {children}
          <Footer />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
