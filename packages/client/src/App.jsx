import { useEffect, useState } from 'react';
// import Register from './components/register/Register';
import { Routes, Route, Link } from 'react-router-dom';
// import Login from './components/login/Login';
import Auth from './pages/auth/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export const App = () => {
  return (
    <>
      <div className="App">
        <ul>
          {/* <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            <Link to="/Register"> Register </Link>
          </li> */}
          <li>
            <Link to="/auth">Auth</Link>
          </li>
        </ul>
      </div>

      <Routes>
        {/* <Route path="/Register" exact element={<Register />}></Route>
        <Route path="/Login" exact element={<Login />}></Route> */}
        <Route path="/auth" exact element={<Auth />} />
      </Routes>
    </>
  );
};
