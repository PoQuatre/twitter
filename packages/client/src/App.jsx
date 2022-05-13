import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalLayout from './components/globalLayout/GlobalLayout';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" exact element={<Auth />} />
        <Route path="/*" element={<GlobalLayout />} />
      </Routes>
    </>
  );
};
