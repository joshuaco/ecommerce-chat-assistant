import { Outlet } from 'react-router';
import Header from '@/components/ui/header';

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
