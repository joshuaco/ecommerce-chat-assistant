import { Routes, Route } from 'react-router';
import MainLayout from '@/layouts/main';
import HomePage from '@/pages/home-page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
