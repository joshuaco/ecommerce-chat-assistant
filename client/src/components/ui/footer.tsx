import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>FurniStore</h3>
            <p className='text-gray-400 mb-4'>
              Transform your space with our premium furniture collection. Quality,
              style, and comfort for every home.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                <Facebook className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                <Instagram className='h-5 w-5' />
              </a>
            </div>

            {/* Made in USA Badge */}
            <div className='mt-6'>
              <div className='inline-flex items-center space-x-2 bg-white border-blue-600 px-3 py-1 rounded-lg'>
                <div className='flex items-center space-x-1'>
                  <img
                    src='https://www.citypng.com/public/uploads/preview/hd-made-in-usa-vector-logo-sign-transparent-png-7040816947089517wi3wuqzwe.png'
                    alt='Made in USA'
                    className='h-16 w-16'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              {['Sofas', 'Chairs', 'Tables', 'Storage', 'Sale Items'].map((link) => (
                <li key={link}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors duration-200'
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Customer Service</h4>
            <ul className='space-y-2'>
              {['Contact Us', 'Shipping Info', 'Returns', 'Size Guide', 'FAQs'].map(
                (link) => (
                  <li key={link}>
                    <a
                      href='#'
                      className='text-gray-400 hover:text-white transition-colors duration-200'
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact Info</h4>
            <div className='space-y-3'>
              <div className='flex items-center space-x-3'>
                <MapPin className='h-4 w-4 text-gray-400' />
                <span className='text-gray-400'>123 Furniture Ave, Design City</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='h-4 w-4 text-gray-400' />
                <span className='text-gray-400'>1-800-FURNI-STORE</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Mail className='h-4 w-4 text-gray-400' />
                <span className='text-gray-400'>hello@furnistore.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © 2025 FurniStore. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <a
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-200'
              >
                Privacy Policy
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-200'
              >
                Terms of Service
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-200'
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
