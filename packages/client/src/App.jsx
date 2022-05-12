import { Routes, Route } from 'react-router-dom';
import Auth from './pages/auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" exact element={<Auth />} />
      </Routes>
    </>
  );
};
