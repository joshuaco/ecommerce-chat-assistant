import { Outlet } from 'react-router';
import Header from '@/components/ui/header';

function MainLayout() {
  return (
    <>
      <Header />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-6'>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
