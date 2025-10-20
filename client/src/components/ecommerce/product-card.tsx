import { Link } from 'react-router';
import { Image } from 'lucide-react';
import type { Item } from '@/schema/product';

interface ProductCardProps {
  product: Item;
}

function ProductCard({ product }: ProductCardProps) {
  // Check if there's a sale
  const isOnSale = product.prices.sale_price > 0;

  return (
    <Link
      to={`/product/${product._id}`}
      className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer'
    >
      {/* Image Placeholder */}
      <div className='relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden'>
        <div className='text-gray-400 text-center'>
          <Image className='mx-auto mb-2 w-12 h-12' />
          <p className='text-sm font-medium'>Product Image</p>
        </div>

        {/* Sale Badge */}
        {isOnSale && (
          <div className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold'>
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className='p-4'>
        {/* Brand */}
        <p className='text-sm text-gray-500 mb-1'>{product.brand}</p>

        {/* Product Name */}
        <h3 className='font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors'>
          {product.item_name}
        </h3>

        {/* Price */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='text-lg font-bold text-gray-900'>
              {isOnSale
                ? `$${product.prices.sale_price.toFixed(2)}`
                : `$${product.prices.full_price.toFixed(2)}`}
            </span>
            {isOnSale && (
              <span className='text-sm text-gray-500 line-through'>
                ${product.prices.full_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className='px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors'>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
