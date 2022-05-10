import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const root = document.getElementById('root');
if (root) {
  ReactDOM.hydrateRoot(
    root,
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  console.error('There is no #root element in the dom!');
}
