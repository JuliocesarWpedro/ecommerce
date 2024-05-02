import { ProductDataType } from '@/types/productsFetchResponse';
import { Metadata } from 'next';

const fetchProductData = async (id: number): Promise<ProductDataType> => {
  const fetchUrl = `https://api-storage-products.vercel.app/products/${id}`;
  const response = await fetch(fetchUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  const data = await response.json();
  return data;
};

export async function generateProductMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = Number(params.id);

  const data = await fetchProductData(id);

  return {
    title: `${data.name}`,
  };
}
