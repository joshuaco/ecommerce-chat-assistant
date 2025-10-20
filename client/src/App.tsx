import { Routes, Route } from 'react-router';
import ProductPage from '@/pages/product-page';
import MainLayout from '@/layouts/main';
import HomePage from '@/pages/home-page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/product/:id' element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default App;
