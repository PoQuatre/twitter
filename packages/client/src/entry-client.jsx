import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const root = document.getElementById('root');
if (root) {
  ReactDOM.hydrateRoot(
    root,
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>,
  );
} else {
  console.error('There is no #root element in the dom!');
}
