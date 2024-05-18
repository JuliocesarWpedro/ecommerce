import { Metadata } from 'next';
import { generateProductMetadata } from './productMetadata';

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  return generateProductMetadata({ params });
}

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default ProductLayout;
