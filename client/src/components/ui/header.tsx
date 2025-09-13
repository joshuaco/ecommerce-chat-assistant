import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

const categories = ['All', 'Sofas', 'Chairs', 'Tables', 'Desks', 'Outdoor'];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <h1 className='text-2xl font-bold text-gray-900'>FurniStore</h1>
          </div>
          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-8'>
            {categories.map((category) => (
              <a
                href='#'
                key={category}
                className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200'
              >
                {category}
              </a>
            ))}
          </nav>
          {/* Search and Cart */}
          <div className='flex items-center space-x-4 py-2'>
            <div className='hidden sm:block relative'>
              <input
                type='text'
                placeholder='Search...'
                className='w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none focus:border-transparent'
              />
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
            </div>

            <button className='relative p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200'>
              <ShoppingCart className='h-6 w-6' />
            </button>

            {/* Mobile Menu Button */}
            <button
              className='md:hidden p-2 text-gray-700 hover:text-gray-900'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden border-t border-gray-200 py-4 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className='px-3'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none focus:border-transparent'
              />
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
            </div>
          </div>

          <div className='mt-4 px-3'>
            <div className='grid grid-cols-2 gap-2'>
              {categories.map((category) => (
                <a
                  href='#'
                  key={category}
                  className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
