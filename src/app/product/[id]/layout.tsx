import { Metadata } from 'next';
import { generateProductMetadata } from './productMetadata';
import { Suspense } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  return generateProductMetadata({ params });
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
    </div>
  );
};

export default ProductLayout;
