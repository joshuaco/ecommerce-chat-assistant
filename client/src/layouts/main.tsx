import { Outlet } from 'react-router';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ChatWidget from '@/components/ecommerce/chat-widget';

function MainLayout() {
  return (
    <>
      <Header />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-6'>
        <Outlet />
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}

export default MainLayout;
