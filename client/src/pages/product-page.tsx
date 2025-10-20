import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductById } from '@/api/products';
import type { Item } from '@/schema/product';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Item | null>(null);

  useEffect(() => {
    getProductById(id as string).then((product) => {
      setProduct(product);
    });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{product.item_name}</h1>
    </div>
  );
}

export default ProductPage;
