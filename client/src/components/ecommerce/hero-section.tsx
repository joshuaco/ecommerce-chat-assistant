import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselData } from '@/data/carousel-data';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <div
      className='relative rounded-2xl mb-12 overflow-hidden h-96 md:h-[500px]'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Images */}
      <div className='relative w-full h-full'>
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full object-cover'
            />
            <div className='absolute inset-0 bg-black opacity-40' />

            {/* Content */}
            <div className='absolute inset-0 flex items-center justify-center text-center text-white px-8'>
              <div className='max-w-3xl'>
                <h2 className='text-2xl md:text-6xl font-bold mb-4 animate-fade-in'>
                  {slide.title}
                </h2>
                <p className='text-lg md:text-2xl mb-8 text-gray-200 animate-fade-in-delay'>
                  {slide.subtitle}
                </p>
                <button className='bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-pointer animate-fade-in-delay-2'>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer hidden sm:block'
        aria-label='Previous slide'
      >
        <ChevronLeft size={24} className='text-black' />
      </button>

      <button
        onClick={goToNext}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm cursor-pointer hidden sm:block'
        aria-label='Next slide'
      >
        <ChevronRight size={24} className='text-black' />
      </button>

      {/* Dots Navigation */}
      <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-gray-300 opacity-50 hover:opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20'>
        <div
          className='h-full bg-gray-400 transition-all duration-1000 ease-linear'
          style={{
            width: `${((currentSlide + 1) / carouselData.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
}

export default HeroSection;
