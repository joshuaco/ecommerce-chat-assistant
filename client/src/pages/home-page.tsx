import { useState } from 'react';
import HeroSection from '@/components/ecommerce/hero-section';

const categories = ['All', 'Beds', 'Tables', 'Sofas', 'Decor'];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  return (
    <div>
      <HeroSection />
      {/* Category Filter */}
      <div className='flex flex-wrap gap-4 mb-8 justify-center'>
        {categories.map((category) => (
          <button
            aria-label={`Filter by ${category}`}
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'></div>
    </div>
  );
}

export default HomePage;
